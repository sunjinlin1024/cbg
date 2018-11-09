var SchoolNameInfo = {
    1: "大唐官府",
    2: "化生寺",
    3: "女儿村",
    4: "方寸山",
    5: "天宫",
    6: "普陀山",
    7: "龙宫",
    8: "五庄观",
    9: "狮驼岭",
    10: "魔王寨",
    11: "阴曹地府",
    12: "盘丝洞",
    13: "神木林",
    14: "凌波城",
    15: "无底洞",
    16: "女魃墓",
    17: "天机城",
    18: "花果山"
};
var RoleKindNameInfo = {
    1: "逍遥生",
    2: "剑侠客",
    3: "飞燕女",
    4: "英女侠",
    5: "巨魔王",
    6: "虎头怪",
    7: "狐美人",
    8: "骨精灵",
    9: "神天兵",
    10: "龙太子",
    11: "舞天姬",
    12: "玄彩娥",
    203: "巫蛮儿",
    205: "杀破狼",
    209: "羽灵神",
    201: "偃无师",
    207: "鬼潇潇",
    211: "桃夭夭"
};
var SchoolKindMapping = {
    1: [1, 2, 3, 4, 203, 201],
    2: [1, 2, 201],
    3: [3, 4, 203],
    4: [1, 2, 3, 4, 203, 201],
    5: [11, 12, 9, 10, 209, 211],
    6: [11, 12, 211],
    7: [11, 12, 9, 10, 209, 211],
    8: [9, 10, 209],
    9: [5, 6, 205],
    10: [7, 8, 5, 6, 205, 207],
    11: [7, 8, 5, 6, 205, 207],
    12: [7, 8, 207],
    13: [1, 2, 3, 4, 203, 201],
    14: [9, 10, 11, 12, 209, 211],
    15: [5, 6, 7, 8, 205, 207],
    16: [5, 6, 7, 8, 205, 207],
    17: [1, 2, 3, 4, 201, 203],
    18: [9, 10, 11, 12, 209, 211]
};
function get_school_name(school_id) {
    return SchoolNameInfo[school_id];
}
function get_role_iconid(type_id) {
    var need_fix_range = [[13, 24], [37, 48], [61, 72], [213, 224], [237, 248], [261, 272]];
    for (var i = 0; i < need_fix_range.length; i++) {
        var range = need_fix_range[i];
        if (type_id >= range[0] && type_id <= range[1]) {
            type_id = type_id - 12;
            break;
        }
    }
    return type_id;
}
function get_role_kind_name(icon) {
    var kindid = icon;
    if (icon > 200) {
        kindid = ((icon - 200 - 1) % 12 + 1) + 200;
    } else {
        kindid = ((icon - 1) % 12 + 1);
    }
    return RoleKindNameInfo[kindid];
}
var PetEquipKindInfo = {
    1: "铠甲",
    2: "项圈",
    3: "护腕"
};
var PRIMARY_YAO_JUE = ["反击", "反震", "吸血", "连击", "飞行", "夜战", "隐身", "感知", "再生", "冥思", "慧根", "必杀", "幸运", "神迹", "招架", "永恒", "敏捷", "强力", "防御", "偷袭", "毒", "驱鬼", "鬼魂术", "魔之心", "神佑复生", "精神集中", "否定信仰", "雷击", "落岩", "水攻", "烈火", "法术连击", "法术暴击", "法术波动", "雷属性吸收", "土属性吸收", "火属性吸收", "水属性吸收", "迟钝"];
var SENIOR_YAO_JUE = ["高级反击", "高级反震", "高级吸血", "高级连击", "高级飞行", "高级夜战", "高级隐身", "高级感知", "高级再生", "高级冥思", "高级慧根", "高级必杀", "高级幸运", "高级神迹", "高级招架", "高级永恒", "高级敏捷", "高级强力", "高级防御", "高级偷袭", "高级毒", "高级驱鬼", "高级鬼魂术", "高级魔之心", "高级神佑复生", "高级精神集中", "高级否定信仰", "奔雷咒", "泰山压顶", "水漫金山", "地狱烈火", "高级雷属性吸收", "高级土属性吸收", "高级火属性吸收", "高级水属性吸收", "高级法术连击", "高级法术暴击", "高级法术波动", "壁垒击破", "嗜血追击", "弱点火", "弱点水", "弱点雷", "弱点土"];
var MO_SHOU_YAO_JUE = PRIMARY_YAO_JUE.concat(SENIOR_YAO_JUE);
function is_advanced_yaojue(name) {
    for (var i = 0; i < SENIOR_YAO_JUE.length; i++)
        if (name.indexOf(SENIOR_YAO_JUE[i]) != -1)
            return true;
    return false;
}
var EquipKind = {
    "pet": 1,
    "stone": 2,
    "msyj": 3,
    "other": 4
};
var PET_WUXING_INFO = {
    "1": "金",
    "2": "木",
    "4": "土",
    "8": "水",
    "16": "火"
};
var PetNeidanInfo = {
    901: "迅敏",
    902: "狂怒",
    903: "阴伤",
    904: "静岳",
    905: "擅咒",
    906: "灵身",
    907: "矫健",
    908: "深思",
    909: "钢化",
    910: "坚甲",
    912: "慧心",
    913: "撞击",
    914: "神机步",
    915: "腾挪劲",
    916: "玄武躯",
    917: "龙胄铠",
    918: "玉砥柱",
    919: "碎甲刃",
    920: "阴阳护",
    921: "凛冽气",
    922: "无畏",
    923: "愤恨",
    924: "舍身击",
    925: "电魂闪",
    926: "通灵法",
    927: "双星爆",
    928: "催心浪",
    929: "淬毒",
    930: "隐匿击",
    931: "狙刺",
    932: "连环",
    933: "圣洁",
    934: "血债偿",
    935: "生死决",
    936: "灵光",
    937: "朱雀甲"
};
var PetSkillInfo = {
    "301": "夜战",
    "302": "反击",
    "303": "反震",
    "304": "吸血",
    "305": "连击",
    "306": "飞行",
    "307": "隐身",
    "308": "感知",
    "309": "再生",
    "310": "冥思",
    "311": "神佑复生",
    "312": "鬼魂术",
    "313": "驱鬼",
    "314": "毒",
    "315": "慧根",
    "316": "必杀",
    "317": "幸运",
    "318": "精神集中",
    "319": "神迹",
    "320": "招架",
    "321": "永恒",
    "322": "敏捷",
    "323": "否定信仰",
    "324": "魔之心",
    "325": "偷袭",
    "326": "雷击",
    "327": "落岩",
    "328": "水攻",
    "329": "烈火",
    "330": "雷属性吸收",
    "331": "土属性吸收",
    "332": "水属性吸收",
    "333": "火属性吸收",
    "334": "强力",
    "335": "防御",
    "401": "高级夜战",
    "402": "高级反击",
    "403": "高级反震",
    "404": "高级吸血",
    "405": "高级连击",
    "406": "高级飞行",
    "407": "高级隐身",
    "408": "高级感知",
    "409": "高级再生",
    "410": "高级冥思",
    "411": "高级神佑复生",
    "412": "高级鬼魂术",
    "413": "高级驱鬼",
    "414": "高级毒",
    "415": "高级慧根",
    "416": "高级必杀",
    "417": "高级幸运",
    "418": "高级精神集中",
    "419": "高级神迹",
    "420": "高级招架",
    "421": "高级永恒",
    "422": "高级敏捷",
    "423": "高级否定信仰",
    "424": "高级魔之心",
    "425": "高级偷袭",
    "426": "奔雷咒",
    "427": "泰山压顶",
    "428": "水漫金山",
    "429": "地狱烈火",
    "430": "高级雷属性吸收",
    "431": "高级土属性吸收",
    "432": "高级水属性吸收",
    "433": "高级火属性吸收",
    "434": "高级强力",
    "435": "高级防御",
    "501": "弱点雷",
    "502": "弱点土",
    "503": "弱点水",
    "504": "弱点火",
    "505": "迟钝",
    "510": "法术连击",
    "511": "*上古灵符占用",
    "512": "*上古灵符占用",
    "513": "*上古灵符占用",
    "514": "*上古灵符占用",
    "515": "*善恶有报占用",
    "516": "*善恶有报占用",
    "526": "金仙秘术",
    "527": "怒号",
    "528": "万宝金甲",
    "529": "魔劲激发",
    "530": "天魔咒术",
    "531": "驭兽术",
    "532": "墨笔追魂",
    "19111": "墨笔追魂（表演）",
    "533": "阎王号令",
    "534": "还魂归魄",
    "535": "盾牌格挡",
    "536": "决一死战",
    "537": "乌纱帽",
    "538": "悬壶济世",
    "539": "对诗",
    "540": "十步一人",
    "541": "仙力激发",
    "542": "腾云跨风",
    "543": "文思泉涌",
    "551": "惊心一剑",
    "552": "死亡召唤",
    "553": "上古灵符",
    "554": "善恶有报",
    "555": "后发制人",
    "556": "针灸",
    "557": "楚楚可怜",
    "558": "定身符",
    "559": "天雷斩",
    "560": "杨柳甘露",
    "561": "龙卷雨击",
    "562": "烟雨剑法",
    "563": "极度疯狂",
    "564": "三昧真火",
    "565": "修罗隐身",
    "566": "勾魂",
    "567": "潜力激发",
    "568": "黄帝内经",
    "569": "还魂咒",
    "570": "蚩尤之搏",
    "571": "力劈华山",
    "572": "夜舞倾城",
    "573": "高级法术连击",
    "575": "法术暴击",
    "576": "法术波动",
    "577": "高级法术暴击",
    "578": "高级法术波动",
    "579": "法术防御",
    "581": "金刚护体",
    "582": "百毒不侵",
    "583": "五雷咒",
    "584": "知己知彼",
    "585": "五行法术",
    "586": "龙腾",
    "587": "炼气化神",
    "588": "威慑",
    "589": "飞砂走石",
    "590": "幽冥鬼眼",
    "591": "姐妹同心",
    "592": "杀气诀",
    "593": "八凶法阵",
    "594": "法术防御",
    "595": "壁垒击破",
    "596": "嗜血追击",
    "597": "剑荡四方",
    "598": "潜能激发",
    "599": "移花接木",
    "624": "龙魂",
    "626": "法术抵抗",
    "627": "高级法术抵抗",
    "628": "盾气",
    "629": "高级盾气",
    "631": "仙人指路",
    "632": "峰回路转",
    "633": "开门见山",
    "634": "张弛有道",
    "635": "四面埋伏",
    "636": "千锤百炼",
    "637": "赴汤蹈火",
    "638": "法力陷阱",
    "639": "灵能激发",
    "640": "合纵",
    "641": "高级合纵",
    "642": "*法力陷阱(触发效果)",
    "644": "雾杀",
    "645": "蜜润",
    "646": "裂石",
    "647": "不动如山",
    "648": "地涌金莲",
    "649": "金身舍利",
    "650": "苍鸾怒击",
    "660": "浮云神马",
    "661": "须弥真言",
    "662": "千钧一怒",
    "663": "天降灵葫",
    "667": "大快朵颐",
    "669": "月光",
    "671": "无畏布施",
    "672": "从天而降",
    "673": "灵山禅语",
    "672": "从天而降",
    "684": "食指大动",
    "685": "理直气壮",
    "336": "独行",
    "337": "法术反震",
    "436": "高级独行",
    "437": "高级法术反震",
    "674": "怨怖之泣",
    "675": "诡蝠之刑",
    "676": "匠心·固甲",
    "677": "匠心·蓄锐",
    "678": "当头一棒",
    "679": "八戒上身"
};
var PetFunctions = {
    1: "攻宠",
    2: "法宠",
    3: "血宠",
    4: "血敏宠",
    5: "炼妖宠"
};
var EmptySkillImg = ResUrl + "/images/role_skills/empty_skill.gif";
var SaleNeidanSkills = ['神机步', '腾挪劲', '玄武躯', '龙胄铠', '玉砥柱', '碎甲刃', '阴阳护', '凛冽气', '舍身击', '电魂闪', '通灵法', '双星爆', '催心浪', '隐匿击', '生死决', '血债偿'];
var SHENSHOU_ITYPES = [102005, 102008, 102016, 102018, 102019, 102020, 102021, 102031, 102032, 102035, 102049, 102050, 102051, 102060, 102100, 102101, 102108, 102109, 102110, 102131, 102132, 102249, 102250, 102255, 102256, 102257, 102258, 102259, 102260, 102261, 102262, 102263, 102264, 102265, 102266, 102267, 102268, 102269, 102270, 102271, 102272, 102273, 102274, 102275, 102276, 102277, 102311, 102312, 102313, 102314, 102315, 102316, 102317, 102318, 102825, 102826, 102827, 102828];
var PetBattleLevelTypes = [[2559, 0], [2047, 0], [2046, 0], [2045, 0], [2044, 0], [2555, 0], [2554, 0], [2042, 0], [2553, 0], [2041, 0], [2552, 0], [2040, 0], [2039, 0], [2038, 0], [2037, 0], [2036, 0], [2548, 0], [2547, 0], [2034, 0], [2546, 0], [2033, 0], [2545, 0], [2544, 0], [2030, 0], [2542, 0], [2029, 0], [2541, 0], [2028, 0], [2540, 0], [2539, 0], [2538, 0], [2537, 0], [2024, 0], [2536, 0], [2023, 0], [2534, 0], [2022, 0], [2533, 0], [2530, 0], [2529, 0], [2017, 0], [2528, 0], [2015, 0], [2012, 0], [2524, 0], [2523, 0], [2011, 0], [2010, 0], [2522, 0], [2009, 0], [2007, 0], [2006, 0], [2517, 0], [2004, 0], [2003, 0], [2515, 0], [2002, 0], [2001, 0], [2512, 0], [2511, 0], [2510, 0], [2509, 0], [2507, 0], [2506, 0], [2504, 0], [2502, 0], [2501, 0], [2324, 2], [2323, 2], [2322, 2], [2321, 2], [2320, 2], [2319, 2], [2824, 2], [2823, 2], [2310, 0], [2822, 2], [2309, 0], [2821, 2], [2308, 0], [2820, 2], [2307, 0], [2819, 2], [2306, 0], [2305, 0], [2304, 0], [2303, 0], [2300, 0], [2810, 0], [2809, 0], [2808, 0], [2807, 0], [2806, 0], [2805, 0], [2804, 0], [2803, 0], [2283, 0], [2783, 0], [2247, 2], [2246, 2], [2245, 2], [2244, 2], [2243, 2], [2242, 2], [2241, 1], [2240, 1], [2239, 1], [2238, 0], [2237, 0], [2236, 0], [2235, 0], [2747, 2], [2234, 0], [2746, 2], [2233, 0], [2745, 2], [2232, 1], [2744, 2], [2231, 1], [2743, 2], [2230, 1], [2742, 2], [2229, 0], [2741, 1], [2228, 0], [2740, 1], [2227, 0], [2739, 1], [2226, 0], [2738, 0], [2225, 0], [2737, 0], [2224, 0], [2736, 0], [2735, 0], [2223, 0], [2222, 0], [2734, 0], [2221, 0], [2733, 0], [2220, 0], [2732, 1], [2219, 0], [2731, 1], [2218, 0], [2730, 1], [2217, 0], [2729, 0], [2216, 0], [2728, 0], [2215, 0], [2727, 0], [2214, 0], [2726, 0], [2213, 0], [2725, 0], [2212, 0], [2724, 0], [2723, 0], [2211, 0], [2722, 0], [2210, 0], [2209, 0], [2721, 0], [2208, 0], [2720, 0], [2207, 0], [2719, 0], [2206, 0], [2718, 0], [2205, 0], [2717, 0], [2204, 0], [2716, 0], [2715, 0], [2203, 0], [2714, 0], [2202, 0], [2713, 0], [2201, 0], [2712, 0], [2200, 0], [2711, 0], [2199, 0], [2198, 0], [2710, 0], [2197, 0], [2709, 0], [2708, 0], [2196, 0], [2707, 0], [2195, 0], [2706, 0], [2194, 0], [2705, 0], [2193, 0], [2704, 0], [2192, 0], [2703, 0], [2191, 0], [2702, 0], [2190, 0], [2701, 0], [2189, 0], [2188, 0], [2700, 0], [2187, 0], [2699, 0], [2698, 0], [2186, 0], [2185, 0], [2697, 0], [2184, 0], [2696, 0], [2183, 0], [2695, 0], [2694, 0], [2182, 0], [2693, 0], [2181, 0], [2692, 0], [2180, 0], [2691, 0], [2179, 0], [2690, 0], [2178, 0], [2689, 0], [2688, 0], [2687, 0], [2686, 0], [2685, 0], [2684, 0], [2683, 0], [2682, 0], [2681, 0], [2680, 0], [2679, 0], [2678, 0], [2164, 0], [2163, 1], [2162, 0], [2161, 1], [2160, 1], [2159, 0], [2153, 0], [2664, 0], [2152, 0], [2663, 1], [2151, 0], [2662, 0], [2150, 0], [2661, 1], [2660, 1], [2659, 0], [2144, 0], [2143, 0], [2142, 0], [2141, 0], [2653, 0], [2140, 0], [2652, 0], [2139, 0], [2651, 0], [2138, 0], [2650, 0], [2137, 0], [2136, 0], [2135, 0], [2134, 0], [2133, 0], [2130, 1], [2129, 0], [2128, 1], [2127, 0], [2126, 1], [2125, 0], [2124, 0], [2123, 0], [2122, 0], [2121, 0], [2120, 0], [2119, 0], [2630, 1], [2118, 0], [2629, 0], [2117, 0], [2628, 1], [2116, 0], [2627, 0], [2115, 0], [2626, 1], [2114, 0], [2625, 0], [2113, 0], [2624, 0], [2112, 0], [2623, 0], [2111, 0], [2622, 0], [2621, 0], [2620, 0], [2619, 0], [2107, 0], [2618, 0], [2106, 0], [2617, 0], [2105, 0], [2616, 0], [2104, 0], [2615, 0], [2103, 0], [2614, 0], [2102, 0], [2613, 0], [2612, 0], [2099, 0], [2611, 0], [2098, 0], [2097, 0], [2096, 0], [2607, 0], [2095, 0], [2606, 0], [2094, 0], [2605, 0], [2093, 0], [2604, 0], [2603, 0], [2602, 0], [2599, 0], [2087, 0], [2598, 0], [2086, 0], [2597, 0], [2085, 0], [2596, 0], [2595, 0], [2594, 0], [2593, 0], [2078, 0], [2077, 0], [2076, 0], [2587, 0], [2586, 0], [2074, 0], [2585, 0], [2073, 0], [2072, 0], [2071, 0], [2070, 0], [2068, 0], [2067, 0], [2578, 0], [2066, 0], [2577, 0], [2065, 0], [2576, 0], [2064, 0], [2063, 0], [2574, 0], [2062, 0], [2061, 0], [2573, 0], [2572, 0], [2571, 0], [2059, 0], [2570, 0], [2568, 0], [2567, 0], [2055, 0], [2054, 0], [2566, 0], [2053, 0], [2565, 0], [2052, 0], [2564, 0], [2563, 0], [2562, 0], [2561, 0], [2048, 0]];
function get_pet_battle_level(petId) {
    for (var i = 0, max = PetBattleLevelTypes.length; i < max; i++) {
        var list = PetBattleLevelTypes[i];
        var id = +list[0] + 100000;
        if (petId == id) {
            return list[1];
        }
    }
    return -1;
}
function get_pet_ext_zz(data, options) {
    function fix_pet_decay_attr(pet, type, downzz) {
        var grade = +(pet.pet_grade || 0);
        var growth = (pet.growth || pet.cheng_zhang || 0) * 1000;
        if (isNaN(grade) || isNaN(growth)) {
            return;
        }
        function tryDecay(keyArr, val) {
            if (typeof keyArr === 'string') {
                keyArr = [keyArr];
            }
            for (var i = 0, max = keyArr.length; i < max; i++) {
                var key = keyArr[i];
                if (key in pet) {
                    pet[key] = Math.max(pet[key] - val, 0) || 0;
                }
            }
        }
        function fixMax(key, maxKeys) {
            if (key in pet) {
                for (var i = 0, max = maxKeys.length; i < max; i++) {
                    var mk = maxKeys[i];
                    if (mk in pet) {
                        pet[key] = Math.min(pet[key], pet[mk]);
                        return;
                    }
                }
            }
        }
        switch (type) {
        case 0:
            var decay = Math.ceil(downzz * grade * 2 / 1000 * (700 + growth / 2) / 1000 * 4 / 3);
            tryDecay('attack', decay);
            break;
        case 1:
            var decay = Math.ceil(downzz * grade * 7 / 4000 * (700 + growth / 2) / 1000);
            tryDecay('defence', decay);
            break;
        case 2:
            var speed = pet.smartness || pet.min_jie;
            if (speed != void 0) {
                var decay = Math.ceil(downzz * speed / 1000);
                tryDecay('speed', decay);
            }
            break;
        case 4:
            var decay = Math.ceil(downzz * grade / 1000);
            var keys = ['max_blood', 'blood_max'];
            tryDecay(keys, decay);
            fixMax('blood', keys);
            break;
        case 5:
            var decayMp = Math.ceil(downzz * grade / 500);
            var mpKeys = ['max_magic', 'magic_max'];
            tryDecay(mpKeys, decayMp);
            fixMax('magic', mpKeys);
            var decayLingli = Math.ceil(downzz * 3 / 10 * grade / 1000);
            tryDecay(['wakan', 'ling_li'], decayLingli);
            break;
        default:
            break;
        }
    }
    function is_shenshou_pet(petId) {
        if (typeof petId === 'string') {
            petId = parseInt(petId) || 0;
        }
        if (petId < 100000) {
            petId += 100000;
        }
        return SHENSHOU_ITYPES.indexOf(petId) >= 0;
    }
    options = Object.merge({
        attrs: 'gong_ji_ext,fang_yu_ext,su_du_ext,duo_shan_ext,ti_li_ext,fa_li_ext',
        total_attrs: 'gong_ji_zz,fang_yu_zz,su_du_zz,duo_shan_zz,ti_li_zz,fa_li_zz',
        csavezz: '',
        carrygradezz: -1,
        pet_id: -1,
        lastchecksubzz: 0
    }, options || {});
    if (is_shenshou_pet(options.pet_id)) {
        return;
    }
    var attrs = options.attrs.split(',')
      , totalAttrs = options.total_attrs.split(',');
    var csavezz = options.csavezz;
    var carrygradezz = options.carrygradezz;
    var lastchecksubzz = options.lastchecksubzz || 0;
    var currentDate = window.ServerTime && ServerTime.indexOf('<!--') < 0 ? parseDatetime(window.ServerTime) : new Date();
    if (!csavezz) {
        return;
    }
    csavezz = csavezz.split('|');
    if (carrygradezz < 0 || carrygradezz === void 0) {
        carrygradezz = get_pet_battle_level(options.pet_id);
    }
    if (carrygradezz < 0) {
        return;
    }
    var maxZZ = [[1550, 1550, 1550, 1800, 5500, 3050], [1600, 1600, 1600, 2000, 6500, 3500], [1650, 1650, 1650, 2000, 7000, 3600]];
    var zz = maxZZ[carrygradezz];
    for (var i = 0, max = zz.length; i < max; i++) {
        var z = zz[i];
        var extKey = attrs[i];
        var totalKey = totalAttrs[i];
        if (totalKey in data) {
            var value = data[totalKey] - Math.max(z, csavezz[i] || 0);
            var ext = data[extKey] = Math.max(value, 0);
            var orgZZ = data[totalKey] - data[extKey];
            data[totalKey] = orgZZ;
            if (ext > 0) {
                var year = lastchecksubzz || 2017;
                var currentYear = currentDate.getFullYear();
                var currentTotalZZ = orgZZ + ext;
                for (var y = currentYear - year; y > 0; y--) {
                    var decay = Math.floor(ext / 2);
                    currentTotalZZ = Math.max(currentTotalZZ - decay, orgZZ);
                    ext = currentTotalZZ - orgZZ;
                    if (ext <= 0) {
                        break;
                    }
                }
                var downExtZZ = data[extKey] - ext;
                data[extKey] = ext;
                if (downExtZZ > 0) {
                    fix_pet_decay_attr(data, i, downExtZZ);
                }
            }
        }
    }
}
