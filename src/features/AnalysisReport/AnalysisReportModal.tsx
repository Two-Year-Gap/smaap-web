import { Chart, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import {
  fetchNeighborhoodsData,
  fetchRecommendedBusinesses,
  Neighborhood,
  RecommendedBusiness,
} from 'src/services/neighborhoodService';
import { fetchPopulation, Population } from 'src/services/populationService';
import { fetchDistricts, fetchNeighborhoods } from 'src/services/regionService';
import { fetchSales, SalesData } from 'src/services/salesService';
import './AnalysisReportModal.css';
Chart.register(...registerables, ChartDataLabels);

interface AnalysisReportModalProps {
  onClose: () => void;
}

const AnalysisReportModal = ({ onClose }: AnalysisReportModalProps) => {
  const { selectedSchool } = useSchoolContext();
  const { selectedBusiness } = useBusinessContext();
  const [neighborhoodId, setNeighborhoodId] = useState<number>(0);
  const [neighborhoodsByType, setNeighborhoodsByType] = useState<{
    STORE: Neighborhood[];
    SALES: Neighborhood[];
    FLOATING: Neighborhood[];
    RESIDENT: Neighborhood[];
  }>({
    STORE: [],
    SALES: [],
    FLOATING: [],
    RESIDENT: [],
  });
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    RecommendedBusiness[]
  >([]);
  const [salesData, setSalesData] = useState<
    { year: number; data: SalesData }[]
  >([]);
  const [populationTrends, setPopulationTrends] = useState<
    { year: number; data: Population }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNeighborhoodsByType = async () => {
      try {
        const types = ['STORE', 'SALES', 'FLOATING', 'RESIDENT'] as const;

        const fetchPromises = types.map((type) =>
          fetchNeighborhoodsData({ type, count: 100 }),
        );
        const results = await Promise.all(fetchPromises);

        const neighborhoodsByTypeData = types.reduce(
          (acc, type, index) => ({
            ...acc,
            [type]: results[index],
          }),
          {} as Record<(typeof types)[number], Neighborhood[]>,
        );

        setNeighborhoodsByType(neighborhoodsByTypeData);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    };

    loadNeighborhoodsByType();
  }, []);

  useEffect(() => {
    if (!selectedSchool) return;

    const fetchNeighborhoodId = async () => {
      try {
        // Extract district and neighborhood names from the school address
        const addressParts = selectedSchool.lotNumberAddress.split(' ');
        const districtName = addressParts[1];
        const neighborhoodName = addressParts[2];

        // Fetch matching district and neighborhood IDs
        const districts = await fetchDistricts();
        const matchedDistrict = districts.find((d) => d.name === districtName);
        if (!matchedDistrict) {
          console.warn('District not found.');
          return;
        }

        const neighborhoods = await fetchNeighborhoods(matchedDistrict.id);
        const matchedNeighborhood = neighborhoods.find(
          (n) => n.name === neighborhoodName,
        );
        if (!matchedNeighborhood) {
          console.warn('Neighborhood not found.');
          return;
        }

        setNeighborhoodId(matchedNeighborhood.id);
      } catch (error) {
        console.error('Error fetching neighborhood ID:', error);
      }
    };

    fetchNeighborhoodId();
  }, [selectedSchool]);

  useEffect(() => {
    if (!neighborhoodId) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch Recommended Businesses
        const recommendBusinessesData =
          await fetchRecommendedBusinesses(neighborhoodId);
        setRecommendedBusinesses(recommendBusinessesData);

        // Fetch Sales Data for each year
        const years = [2021, 2022, 2023];
        const salesPromises = years.map((year) =>
          fetchSales({
            year,
            neighborhood_id: neighborhoodId,
            ...(selectedBusiness?.id !== 0 && {
              business_id: selectedBusiness?.id,
            }),
          }),
        );
        const salesResults = await Promise.all(salesPromises);
        setSalesData(
          years.map((year, index) => ({
            year,
            data: salesResults[index],
          })),
        );

        // Fetch Population Trends for each year
        const populationPromises = years.map((year) =>
          fetchPopulation({
            year,
            neighborhood_id: neighborhoodId,
          }),
        );
        const populationResults = await Promise.all(populationPromises);
        setPopulationTrends(
          years.map((year, index) => ({
            year,
            data: populationResults[index],
          })),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [neighborhoodId, neighborhoodsByType]);

  const formatNumber = (num: number) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (loading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const lineChartOptions: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${formatNumber(
              tooltipItem.raw as number,
            )}`,
        },
      },
      datalabels: {
        display: true,
        color: '#000',
        formatter: (value) => `${formatNumber(value)}`,
      },
    },
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      datalabels: {
        display: true,
        color: '#000',
        formatter: (value) => `${formatNumber(value)}%`,
      },
    },
  };

  // Prepare Chart Data
  const businessPieData = {
    labels: recommendedBusinesses.map((b) => b.name),
    datasets: [
      {
        data: recommendedBusinesses.map((b) => b.percent),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const salesAmountData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: '매출액 추이',
        data: salesData.map((s) => s.data.salesAmount),
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  const salesCountData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: '매출 건수 추이',
        data: salesData.map((s) => s.data.salesCount),
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  };

  // 생활인구 추이 데이터
  const populationLineData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: '유동인구',
        data: populationTrends.map((p) => p.data.visitPopulation),
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: '직장인구',
        data: populationTrends.map((p) => p.data.workPopulation),
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: '거주인구',
        data: populationTrends.map((p) => p.data.homePopulation),
        borderColor: '#FFCE56',
        fill: false,
      },
    ],
  };

  // 고객 유형 분석 데이터 (2023년도 기준)
  const population2023 = populationTrends.find((p) => p.year === 2023)?.data;
  const totalPopulation2023 =
    (population2023?.visitPopulation || 0) +
    (population2023?.workPopulation || 0) +
    (population2023?.homePopulation || 0);
  const populationPieData = {
    labels: ['유동인구', '직장인구', '거주인구'],
    datasets: [
      {
        data: [
          ((population2023?.visitPopulation || 0) / totalPopulation2023) * 100,
          ((population2023?.workPopulation || 0) / totalPopulation2023) * 100,
          ((population2023?.homePopulation || 0) / totalPopulation2023) * 100,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="modal-overlay">
      {!loading && (
        <div className="modal-content">
          <header className="modal-header">
            <div>
              <h2>상권 분석 리포트</h2>
              <span>~ 2023년 기반</span>
            </div>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </header>

          <div className="modal-body">
            {/* 점포수, 매출액, 유동인구, 생활인구 */}
            <section>
              <h3>분석 요약</h3>
              <div className="simple-analysis">
                <div>
                  <span>점포수</span>
                  <span className="value">
                    {formatNumber(
                      neighborhoodsByType.STORE.find(
                        (n) =>
                          n.name ===
                          selectedSchool?.lotNumberAddress.split(' ')[2],
                      )?.count || 0,
                    )}{' '}
                    개
                  </span>
                </div>
                <div>
                  <span>매출액</span>
                  <span className="value">
                    {formatNumber(
                      neighborhoodsByType.SALES.find(
                        (n) =>
                          n.name ===
                          selectedSchool?.lotNumberAddress.split(' ')[2],
                      )?.count || 0,
                    )}{' '}
                    원
                  </span>
                </div>
                <div>
                  <span>유동인구</span>
                  <span className="value">
                    {formatNumber(
                      neighborhoodsByType.FLOATING.find(
                        (n) =>
                          n.name ===
                          selectedSchool?.lotNumberAddress.split(' ')[2],
                      )?.count || 0,
                    )}{' '}
                    명
                  </span>
                </div>
                <div>
                  <span>거주인구</span>
                  <span className="value">
                    {formatNumber(
                      neighborhoodsByType.RESIDENT.find(
                        (n) =>
                          n.name ===
                          selectedSchool?.lotNumberAddress.split(' ')[2],
                      )?.count || 0,
                    )}{' '}
                    명
                  </span>
                </div>
              </div>
            </section>

            {/* 현재 뜨는 업종 분석 */}
            <section>
              <h3>현재 뜨는 업종</h3>
              <div className="pie-chart-container">
                <Pie
                  data={businessPieData}
                  options={pieChartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>
            </section>

            {/* 매출 추이 */}
            <section>
              <h3>매출</h3>
              <h4>매출액 추이</h4>
              <div className="line-chart-container">
                <Line
                  data={salesAmountData}
                  options={lineChartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>
              <h4>매출 건수 추이</h4>
              <div className="line-chart-container">
                <Line
                  data={salesCountData}
                  options={lineChartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>
            </section>

            {/* 생활인구 추이 */}
            <section>
              <h3>생활인구 추이</h3>
              <div className="line-chart-container">
                <Line
                  data={populationLineData}
                  options={lineChartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>
            </section>

            {/* 고객 유형 분석 */}
            <section>
              <h3>고객 유형 분석</h3>
              <div className="pie-chart-container">
                <Pie
                  data={populationPieData}
                  options={pieChartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisReportModal;
