/**
 * @description 删除线
 * @author lkw
 */

import BtnMenu from '../menu-constructors/BtnMenu'
import $ from '../../utils/dom-core'
import Editor from '../../editor'
import { MenuActive } from '../menu-constructors/Menu'

class StrikeThrough extends BtnMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="w-e-menu" data-title="删除线">
                <i class="w-e-icon-strikethrough"></i>
            </div>`
        )
        super($elem, editor)
    }

    /**
     * 点击事件
     */
    public clickHandler(): void {
        const editor = this.editor
        const isSelectEmpty = editor.selection.isSelectionEmpty()

        if (isSelectEmpty) {
            // 选区范围是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange()
        }

        // 执行 strikeThrough 命令
        editor.cmd.do('strikeThrough')

        if (isSelectEmpty) {
            // 需要将选区范围折叠起来
            editor.selection.collapseRange()
            editor.selection.restoreSelection()
        }
    }

    /**
     * 尝试修改菜单激活状态
     */
    public tryChangeActive(): void {
        const editor = this.editor
        if (editor.cmd.queryCommandState('strikeThrough')) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

export default StrikeThrough
