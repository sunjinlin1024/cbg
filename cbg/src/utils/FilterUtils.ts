module FilterUtil {
    export const BLACK = new egret.ColorMatrixFilter([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0
    ])
    export const DARK = new egret.ColorMatrixFilter([
        0.5, 0, 0, 0, 0,
        0, 0.5, 0, 0, 0,
        0, 0, 0.5, 0, 0,
        0, 0, 0, 1, 0
    ])
    export const BRIGHT = new egret.ColorMatrixFilter([
        2, 0, 0, 0, 0,
        0, 2, 0, 0, 0,
        0, 0, 2, 0, 0,
        0, 0, 0, 1, 0
    ])

    export const RED = new egret.ColorMatrixFilter([
        2, 0, 0, 0, 0,
        0, 0.5, 0, 0, 0,
        0, 0, 0.5, 0, 0,
        0, 0, 0, 1, 0,
    ])

    export const YELLOW = new egret.ColorMatrixFilter([
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ])

    export const GREEN = new egret.ColorMatrixFilter([
        0, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ])

    export const ORANGE = new egret.ColorMatrixFilter([
        1, 0, 0, 0, 0,
        0, 0.5, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ])

    export const PURPLE = new egret.ColorMatrixFilter([
        0.75, 0, 0, 0, 0,
        0, 0.2, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ])

    export const GRAY = new egret.ColorMatrixFilter([
        0.5, 0.5, 0.082, 0, 0,
        0.5, 0.5, 0.082, 0, 0,
        0.5, 0.5, 0.082, 0, 0,
        0, 0, 0, 1, 0
    ])

    export function addFilter(target: egret.DisplayObject, filter: egret.Filter | egret.CustomFilter, single: boolean = true) {
        if (single && target.filters) {
            for (let f of target.filters) {
                if (f == filter) {
                    return
                }
            }
        }
        let filters = target.filters ? target.filters : []
        filters.push(filter)
        target.filters = filters
    }

    export function removeFilter(target: egret.DisplayObject, filter: egret.Filter | egret.CustomFilter) {
        if (target.filters) {
            let filters = target.filters;
            for (let idx = filters.length - 1; idx >= 0; idx--) {
                if (filters[idx] == filter) {
                    filters.splice(idx, 1);
                    target.filters = filters;
                    target.filters = target.filters
                    return idx
                }
            }
        }
        return -1
    }

    export function clearFilter(target: egret.DisplayObject) {
        target.filters = null;
    }

    export function setColor(target: egret.DisplayObject, r: number, g: number, b: number, a: number = 255) {
        target.filters = null;
        let colorMatrix = [
            r / 255, 0, 0, 0, 0,
            0, g / 255, 0, 0, 0,
            0, 0, b / 255, 0, 0,
            0, 0, 0, a / 255, 0
        ];
        FilterUtil.addFilter(target, new egret.ColorMatrixFilter(colorMatrix));
    }
}