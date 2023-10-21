export function calcColWidth(containerWidth: number, verticalMargin: number, colNum: number) {
  return (containerWidth - verticalMargin * (colNum + 1)) / colNum
}
