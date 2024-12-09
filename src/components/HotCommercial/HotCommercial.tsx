import { useEffect, useState } from 'react';
import { AnalysisItem, useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useMenuOptionContext } from 'src/contexts/MenuOptionContext';
import {
  fetchNeighborhoodsData,
  Neighborhood,
  NeighborhoodsApiParams,
} from 'src/services/neighborhoodService';
import './HotCommercial.css';

const HotCommercial = () => {
  const { selectedAnalysisItem } = useAnalysisContext();
  const { selectedOption } = useMenuOptionContext();
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false); // Track data loading completion

  // Mapping of AnalysisItem to API `type` values
  const analysisTypeMapping: Record<
    AnalysisItem,
    {
      type: NeighborhoodsApiParams['type'] | null;
      unit: string;
      divideBy?: number;
    }
  > = {
    점포수: { type: 'STORE', unit: '개' },
    매출액: { type: 'SALES', unit: '만 원', divideBy: 10000 },
    유동인구: { type: 'FLOATING', unit: '명' },
    거주인구: { type: 'RESIDENT', unit: '명' },
    안전비상벨: { type: null, unit: '' },
    안전지킴이집: { type: null, unit: '' },
    CCTV: { type: null, unit: '' },
  };

  // Determine the API type based on the selectedAnalysisItem
  const analysisMapping = analysisTypeMapping[selectedAnalysisItem!];
  const apiType = analysisMapping?.type;
  const unit = analysisMapping?.unit || '';
  const divideBy = analysisMapping?.divideBy || 1;

  useEffect(() => {
    // Reset state when AnalysisItem changes
    setLoaded(false);
    setNeighborhoods([]);
    setLoading(true);

    // Do not fetch data if the selectedAnalysisItem is not relevant
    if (!apiType) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const params: NeighborhoodsApiParams = { type: apiType, count: 5 };
        const data = await fetchNeighborhoodsData(params);
        setNeighborhoods(data);
      } catch (error) {
        console.error('Error fetching hot commercial neighborhoods:', error);
      } finally {
        setLoading(false);
        setLoaded(true); // Indicate that loading is complete
      }
    };

    fetchData();
  }, [apiType]);

  // Wait for data to be fully loaded before rendering
  if (
    !loaded ||
    apiType === null ||
    selectedOption !== '분석 개요' ||
    !selectedAnalysisItem
  ) {
    return null;
  }

  return (
    <div className="hot-commercial">
      <div className="header">
        <h3>지금 핫한 상권</h3>
        <div>
          <p>{selectedAnalysisItem} 기준</p>
          <span>단위: {unit}</span>
        </div>
      </div>

      {!loading ? (
        <ul className="neighborhood-list">
          {neighborhoods.map((neighborhood, index) => (
            <li key={neighborhood.id} className={'neighborhood-item'}>
              <span className="rank">{index + 1}</span>
              <span className="name">{neighborhood.name}</span>
              <span className="count">
                {divideBy > 1
                  ? Math.round(neighborhood.count / divideBy).toLocaleString()
                  : neighborhood.count.toLocaleString() || '-'}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default HotCommercial;
