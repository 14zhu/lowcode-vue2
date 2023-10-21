export const BaseContextmenuOptions = [
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-setting"></i><p class="text-xs">编辑</p></div>`,
    slug: 'edit',
    option: {
      editDisabled: false,
    },
  },
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-document-copy"></i><p class="text-xs">复制</p></div>`,
    slug: 'copy',
    option: {
      copyDisabled: false,
    },
  },
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-delete"></i><p class="text-xs">删除</p></div>`,
    slug: 'delete',
    option: {
      deleteDisabled: false,
    },
  },
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-bottom-right"></i><p class="text-xs">移出</p></div>`,
    slug: 'outside',
    class: 'disabled',
    option: {
      outsideDisabled: true,
    },
  },
  {
    type: 'divider',
  },
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-refresh-left"></i><p class="text-xs">重置</p></div>`,
    slug: 'back',
    option: {
      resetDisabled: false,
    },
  },
  {
    name: `<div class="flex items-center h-5"><i class="el-icon-full-screen"></i><p class="text-xs">填充</p></div>`,
    slug: 'full',
    class: '',
    option: {
      resizeDisabled: false,
      fixable: true,
    },
  },
]
