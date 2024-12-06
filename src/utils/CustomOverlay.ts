class CustomOverlay extends naver.maps.OverlayView {
  position: naver.maps.LatLng;
  content: HTMLElement;
  map: NaverMap | null;

  constructor(options: {
    position: naver.maps.LatLng;
    content: HTMLElement;
    map: NaverMap | null;
    zIndex?: number;
  }) {
    console.log('class 실행');
    if (!naver || !naver.maps) {
      throw new Error('Naver Maps API is not loaded');
    }

    super();
    this.position = options.position;
    this.content = options.content;
    this.map = options.map;

    // zIndex 설정
    if (options.zIndex) {
      this.content.style.zIndex = `${options.zIndex}`;
    }

    // 맵에 추가
    if (this.map) {
      this.setMap(this.map);
    }
  }

  // 오버레이가 지도에 추가될 때 호출
  onAdd() {
    const overlayLayer = this.getPanes()?.overlayLayer;
    console.log('overlayer onAdd() 실행', overlayLayer);
    if (overlayLayer) {
      overlayLayer.appendChild(this.content);
    }
  }

  // 오버레이가 지도에 표시될 때 호출
  draw() {
    const projection = this.getProjection();
    if (!projection || !this.position) return;

    // 지도 좌표를 화면상의 픽셀 좌표로 변환
    const position = projection
      .fromCoordToPoint(this.position)
      .sub(projection.fromCoordToOffset(new naver.maps.Point(0, 0)));

    if (position) {
      this.content.style.position = 'absolute';
      this.content.style.left = `${position.x}px`;
      this.content.style.top = `${position.y}px`;
    }
  }

  // 오버레이가 제거될 때 호출
  onRemove() {
    if (this.content.parentNode) {
      this.content.parentNode.removeChild(this.content);
    }
  }

  // 위치 설정 메서드
  setPosition(position: naver.maps.LatLng) {
    this.position = position;
    this.draw(); // 위치 변경 후 재렌더링
  }

  // 가시성 설정 메서드
  setVisible(visible: boolean) {
    this.content.style.display = visible ? 'block' : 'none';
  }
}

export default CustomOverlay;
