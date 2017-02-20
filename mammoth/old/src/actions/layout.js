/**
 * Created by apple-pc on 16/4/4.
 */

export const PANEL_VISIBLE = 'PANEL_VISIBLE';

export function setPanelVisible(visible) {
    return {
        type: PANEL_VISIBLE,
        visible
    };
}
