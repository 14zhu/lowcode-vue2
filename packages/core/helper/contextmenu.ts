export function runContextmenuMethod(event: any, _this: any): any {
  const eventName = event.option.slug
  let target = _this
  switch (eventName) {
    case 'back':
      target.onClickResetLayoutItem(event.item)
      break
    case 'full':
      target.onClickResizeItem(event.item)
      break
    case '50%':
      target.onClickWidth(event.item, 0.5)
      break
    case '100%':
      target.onClickWidth(event.item, 1)
      break
    case 'edit':
      target.onClickItem(event.item, true)
      break
    case 'copy':
      target.onClickCopyItem(event.item)
      break
    case 'delete':
      target.onClickDeleteItem(event.item)
      break
    case 'outside':
      target.onClickRemoveItem(event.item)
      break
    default:
      break
  }
}
