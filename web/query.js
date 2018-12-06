var gQuery = {
    isDefaultSort: !getPara('query_order'),
    removeEmptyKey: function(arg) {
        Object.keys(arg).forEach(function(key) {
            var val = arg[key];
            if (val === '' || val == null) {
                delete arg[key];
            }
        });
        return arg;
    }
};
function init_query_page(callback) {
    var isOnlyRequestTest = false;
    var kindIds = [];
    var searchType = '';
    var MONEY_KINDID = 23;
    var isFairShow = false;
    if (window.CommonVar && window.QueryVar) {
        var act = CommonVar.act;
        if (act === 'recommend_search' && QueryVar.recommend_type) {
            var recommendType = QueryVar.recommend_type.toString();
            kindIds = ({
                '1': [27],
                '2': [55, 57],
                '3': [1],
                '4': [60]
            })[recommendType] || [];
        } else if (act == 'query' || act == 'search_role_equip_no_refer') {
            kindIds = [QueryVar.kindid];
        } else if (/^search_/.test(act) || act == 'type_query' || act == 'fair_show_type_query') {
            searchType = act;
        } else if (act == 'fair_show_query') {
            isFairShow = true;
        }
    }
    if (kindIds.length > 0 || searchType || isFairShow) {
        var pageCount = 15;
        var viewLoc = window.equip_refer_loc || '';
        var equipRefer = ({
            reco_left: 26,
            search_cond: 33,
            search_key: 34
        })[viewLoc] || '';
        var $tbody = $$('#soldList tbody')[0];
        var $thead = $$('#soldList thead')[0];
        $tbody.setStyle('display', 'none');
        var $pager = $$('#pager');
        $pager.setStyle('display', 'none');
        var $tr = $tbody.getElement('tr');
        var colspan = 10;
        if ($tr) {
            colspan = $tr.getElements('td').length;
            if (colspan <= 1 && $thead) {
                colspan = $thead.getElement('tr').getElements('th').length;
            }
        }
        var $loading = new Element('tbody', {
            html: '<tr><td colspan="' + colspan + '" class="vama"><img src="' + ResUrl + '/images/loading.gif" /> <span>努力加载中..</span></td></tr>'
        });
        $tbody.grabAfter($loading);
        var fnFinish = function() {
            $loading.dispose();
            $tbody.setStyle('display', '');
            $pager.setStyle('display', '');
            callback && callback();
        };
        var params = Object.merge({},
        window.CommonVar || {},
        window.QueryVar || {},
        {
            act: 'recommd_by_role',
            view_loc: viewLoc,
            page: getPara('page') || 1,
            count: pageCount
        });
        if (QueryVar.kindid == MONEY_KINDID) {
            params.order_by = 'unit_price ASC';
        }
        if (kindIds.length > 0) {
            params.kindid = kindIds.join(',');
        }
        params = gQuery.removeEmptyKey(params);
        if (searchType) {
            if (searchType == 'type_query' || searchType == 'fair_show_type_query') {
                params.keyword = params.search_text.fromBase64();
                delete params.search_text;
            } else {
                params.search_type = searchType;
            }
            if (searchType == 'fair_show_type_query') {
                params.pass_fair_show = 0;
            }
        }
        if (isFairShow || (getPara('pass_fair_show') && getPara('pass_fair_show') == 0)) {
            params.pass_fair_show = 0;
            params.order_by = 'selling_time DESC';
        }
        var options = {};
        if (isOnlyRequestTest) {
            fnFinish();
        } else {
            options = {
                needAjaxGuard: true,
                ajaxGuardParams: {
                    onSuccess: function() {
                        request();
                    }
                },
                onSuccess: function(result) {
                    if (result && result.status == 1 && result.pager) {
                        var length = (result.equips || []).length;
                        var pager = result.pager;
                        try {
                            $tbody.set({
                                html: render('recommd_result_templ', {
                                    view_loc: viewLoc,
                                    equip_refer: equipRefer,
                                    showCollect: true,
                                    showNoResult: true,
                                    equips: result.equips || []
                                })
                            });
                            if (result.pager.num_end > 1) {
                                $pager.set({
                                    html: render('pager_templ', result)
                                });
                                $pager.getElements('span').forEach(function(el) {
                                    el.dispose();
                                });
                            }
                            $$('.qListFilter .qPager').set('data-total', pager.num_end).set('data-cur', pager.cur_page);
                        } catch(e) {}
                    }
                    fnFinish();
                },
                onFailure: fnFinish
            };
        }
        function request() {
            ApiRecommd.queryList(params, options);
        }
        request();
    } else {
        callback && callback();
    }
}
function query(common_var, query_var) {
    var arg = Object.merge(common_var, query_var);
    arg = gQuery.removeEmptyKey(arg);
    var static_url = get_static_url(arg);
    if (static_url) {
        location.href = static_url;
    } else {
        submit_advance_search(arg);
    }
}
function get_static_url(arg) {
    if (!StaticFileConfig.is_using) {
        return null;
    }
    if (arg.act != 'query' || arg.page > StaticFileConfig.max_page || NoStaticKindIds.contains(arg.kindid)) {
        return null;
    }
    if (! ['', 'selling_time DESC'].contains(arg.query_order)) {
        return null;
    }
    if (arg.kind_depth > MaxStaticDepth) {
        return null;
    }
    if (arg.kindid && arg.kindid > 0) {
        return StaticFileConfig["res_root"] + "/" + ServerInfo["server_id"] + "/search_by_kind/" + arg.kindid + "/equip_list" + arg.page + ".html";
    } else {
        return StaticFileConfig["res_root"] + "/" + ServerInfo["server_id"] + "/buy_equip_list/equip_list" + arg.page + ".html";
    }
}
function search_by_kind(kindid, kind_depth) {
    if (FairShowType == 'pass_fair_show') {
        CommonVar['act'] = 'query';
    } else {
        CommonVar['act'] = 'fair_show_query';
    }
    CommonVar['page'] = 1;
    CommonVar['query_order'] = '';
    query_var = {
        'kindid': kindid,
        'kind_depth': kind_depth
    };
    if (kindid == 57 || get_descendant_kindids(kind, 57).contains(kindid)) {
        CommonVar['act'] = 'search_role_equip_no_refer';
        if (FairShowType != 'pass_fair_show') {
            query_var['pass_fair_show'] = 0;
        }
    }
    query(CommonVar, query_var);
}
function goto_page(page, other_params) {
    CommonVar['page'] = page;
    if (CommonVar.act == 'query' && getPara('kind_depth')) {
        QueryVar.kind_depth = parseInt(decodeURIComponent(getPara("kind_depth")));
    }
    if (getPara('search_text')) {
        QueryVar.search_text = decodeURIComponent(getPara('search_text'));
    }
    query(CommonVar, Object.merge({},
    QueryVar, other_params || {}));
}
var goto = goto_page;
function search_order_by(order_by, order) {
    if (!order_by) {
        CommonVar.query_order = '';
    } else if (order_by == 'expire_time') {
        CommonVar.query_order = order_by + " " + order;
    } else if (order_by == "price" || order_by == "unit_price") {
        if (order != null) {
            CommonVar.query_order = order_by + " " + order;
        }
    } else {
        if (el_order.value == "price ASC") {
            CommonVar.query_order = "price DESC";
        } else {
            CommonVar.query_order = "price ASC";
        }
    }
    goto_page(1);
}
function show_equip_search_form() {
    var arg = QueryVar;
    if (CheckVar.cur_storage_type != StorageStype.equip) {
        arg = {};
    }
    $("advance_search_panel").setStyle("display", "block");
    $$('.advance_search_link').removeClass('on');
    $('equip_search') && $('equip_search').addClass('on');
    render_to_replace("advance_search_panel", "equip_search_templ", {
        "arg": arg,
        "common_arg": CommonVar
    });
    if (CommonVar.act == 'search_material') {
        $('sel_material_s_type').set('value', arg.s_type || "");
    } else if (CommonVar.act == 'search_jl_stone') {
        $('sel_jl_stone_s_type').set('value', arg.s_type || "");
    }
    init_msyj_select_box();
    set_equip_search_event();
    set_chk_fair_show(arg, 'equip');
    $('suit_effect_panel').suit_value_getter = new SuitValueGetter();
    var item_list = $$("#sum_attr_panel li");
    var selected_types = arg['sum_attr_type'] ? arg['sum_attr_type'] : '';
    for (var i = 0; i < item_list.length; i++) {
        var item = item_list[i];
        var label = item.getAttribute('data_value');
        if (label && selected_types.search(label) != -1) {
            item.addClass('on');
        }
        item.addEvent("click",
        function() {
            var el = $(this);
            if (el.hasClass("on")) {
                el.removeClass("on");
            } else {
                el.addClass("on");
            }
        })
    }
    var suit_effect = arg['suit_effect'];
    var arr = {
        'added_status': SuitAddedStatus,
        'append_skill': SuitAppendSkills,
        'transform_skill': SuitTransformSkills,
        'transform_charm': SuitTransformCharms
    }
    for (var k in arr) {
        var v = arr[k];
        for (var name in v) {
            var code = v[name];
            if (code + '' == suit_effect) {
                $('radio_' + k).setProperty('checked', true);
                $('txt_' + k).value = name;
                break;
            }
        }
    }
    QueryVar['hide_lingshi'] = 1;
}
function show_pet_equip_search_form() {
    var arg = QueryVar;
    if (CommonVar.act !== "search_pet_equip" && !is_pet_equip(QueryVar.kindid)) {
        arg = {};
    }
    $("advance_search_panel").setStyle("display", "block");
    $$('.advance_search_link').removeClass('on');
    $('pet_equip_search').addClass('on');
    render_to_replace("advance_search_panel", "pet_equip_search_templ", {
        "arg": arg,
        "common_arg": CommonVar
    });
    init_addon_status_box();
    set_chk_fair_show(arg, 'equip');
    var item_list = $$("#addon_skill_box li");
    for (var i = 0; i < item_list.length; i++) {
        var item = item_list[i];
        var label = item.getAttribute('data_value');
        if (label && arg[label] === "1") {
            item.addClass('on');
        }
        item.addEvent("click",
        function() {
            var el = $(this);
            if (el.hasClass("on")) {
                el.removeClass("on");
            } else {
                el.addClass("on");
            }
        })
    }
}
function check_search_panel() {
    if (CheckVar.cur_storage_type == StorageStype.role) {
        show_role_search_form();
        $$('.advance_search_link').removeClass('on');
        $('role_search').addClass('on');
        $("highlight_filter").value = safe_attr(QueryVar["highlight_filter"]);
        update_highlight_filter_panel();
    } else if (CheckVar.cur_storage_type == StorageStype.pet) {
        show_pet_search_form();
        $$('.advance_search_link').removeClass('on');
        $('pet_search') && $('pet_search').addClass('on');
        $("highlight_filter").value = safe_attr(QueryVar["highlight_filter"]);
        update_highlight_filter_panel();
    } else if (CommonVar.act === "search_lingshi" || is_lingshi(QueryVar.kindid)) {
        show_lingshi_search_form();
        $$('.advance_search_link').removeClass('on');
        $('lingshi_search').addClass('on');
    } else if (CommonVar.act === "search_pet_equip" || is_pet_equip(QueryVar.kindid)) {
        show_pet_equip_search_form();
        $$('.advance_search_link').removeClass('on');
        $('pet_equip_search').addClass('on');
    } else if (CheckVar.cur_storage_type == StorageStype.equip) {
        show_equip_search_form();
        $$('.advance_search_link').removeClass('on');
        $('equip_search') && $('equip_search').addClass('on');
        $("highlight_filter").value = safe_attr(QueryVar["highlight_filter"]);
        update_highlight_filter_panel();
    } else {
        $("advance_search_panel").style.display = "none";
    }
}
function show_role_search_form() {
    var arg = QueryVar;
    if (CheckVar.cur_storage_type != StorageStype.role) {
        arg = {};
    }
    $("advance_search_panel").setStyle("display", "block");
    $$('.advance_search_link').removeClass('on');
    $('role_search').addClass('on');
    render_to_replace("advance_search_panel", "role_search_templ", {
        "arg": arg
    });
    var bb_expt_attrs = ['bb_expt_gongji', 'bb_expt_fangyu', 'bb_expt_fashu', 'bb_expt_kangfa', 'bb_expt_total'];
    var s_bb_expt = null;
    for (var i = 0; i < bb_expt_attrs.length; i++) {
        var k = bb_expt_attrs[i];
        if (arg[k]) {
            s_bb_expt = k;
            break;
        }
    }
    if (s_bb_expt) {
        $('sel_expt_bb').set('value', s_bb_expt);
        $('txt_bb_expt').set('value', arg[s_bb_expt]);
    }
    $('sel_school_skill_num').set('value', arg.school_skill_num);
}
function show_pet_search_form() {
    var arg = QueryVar;
    if (CheckVar.cur_storage_type != StorageStype.pet) {
        arg = {};
    }
    $("advance_search_panel").style.display = "block";
    $$('.advance_search_link').removeClass('on');
    $('pet_search') && $('pet_search').addClass('on');
    render_to_replace("advance_search_panel", "pet_search_templ", {
        "arg": arg
    });
    init_pet_select_box();
    var pet_aptitudes = ['attack_aptitude', 'defence_aptitude', 'physical_aptitude', 'magic_aptitude', 'speed_aptitude', 'avoid_aptitude'];
    var s_pet_aptitude = null;
    for (var i = 0; i < pet_aptitudes.length; i++) {
        var k = pet_aptitudes[i];
        if (arg[k]) {
            s_pet_aptitude = k;
            break;
        }
    }
    if (s_pet_aptitude) {
        $('sel_pet_aptitude').set('value', s_pet_aptitude);
        $('txt_pet_aptitude').set('value', arg[s_pet_aptitude]);
    }
    var pet_status = "";
    if (arg.is_baobao == "0") {
        pet_status = 'yesheng';
    } else if (arg.is_baobao == "1") {
        pet_status = 'baobao';
    } else if (arg.color == "1") {
        pet_status = 'color1';
    } else if (arg.color == "2") {
        pet_status = 'color2';
    }
    $('sel_pet_status').set('value', pet_status);
    $('sel_pet_skill').set('value', arg.skill);
    if (arg.hasOwnProperty("no_include_sp_skill") && arg.no_include_sp_skill != "") {
        $('no_include_sp_skill').checked = true;
    }
    set_chk_fair_show(arg, 'pet');
}
function init_lingshi_select_box() {
    var basic_attr = {
        61 : [['damage', '戒指&middot;伤害'], ['defense', '戒指&middot;防御']],
        62 : [['magic_damage', '耳饰&middot;法伤'], ['magic_defense', '耳饰&middot;法防']],
        63 : [['fengyin', '手镯&middot;封印'], ['anti_fengyin', '手镯&middot;抗封']],
        64 : [['speed', '佩饰&middot;速度']]
    };
    var add_attr1 = [[1, '固伤'], [2, '伤害'], [3, '速度'], [4, '法伤'], [5, '狂暴'], [6, '物理暴击'], [7, '法术暴击'], [8, '封印'], [9, '法伤结果'], [10, '穿刺'], [11, '治疗']];
    var add_attr2 = [[12, '气血'], [13, '防御'], [14, '法防'], [15, '抗物理暴击'], [16, '抗法术暴击'], [17, '抗封'], [18, '格挡'], [19, '回复']];
    var sel_lingshi_type = $('sel_lingshi_type').value;
    sel_lingshi_type = parseInt(sel_lingshi_type);
    var target_attr = [];
    if (basic_attr[sel_lingshi_type]) {
        target_attr = basic_attr[sel_lingshi_type];
    } else {
        for (var i = 61; i < 65; i++) {
            target_attr = target_attr.concat(basic_attr[i]);
        }
    }
    var option_html = '<option value="">--请选择属性--</option>';
    for (var i = 0; i < target_attr.length; i++) {
        var item = target_attr[i];
        option_html += '<option value="' + item[0] + '">' + item[1] + '</option>';
    }
    $('sel_basic_attr_type').set({
        'html': option_html,
        'value': ''
    });
    option_html = '<option value="0">不限</option>';
    target_attr = [];
    if (sel_lingshi_type == 61 || sel_lingshi_type == 62) {
        target_attr = add_attr1;
    } else if (sel_lingshi_type == 63 || sel_lingshi_type == 64) {
        target_attr = add_attr2;
    } else {
        target_attr = add_attr1.concat(add_attr2);
    }
    for (var i = 0; i < target_attr.length; i++) {
        var item = target_attr[i];
        option_html += '<option value="' + item[0] + '">' + item[1] + '</option>';
    }
    $$('#sel_add_attr1, #sel_add_attr2, #sel_add_attr3').set({
        'html': option_html,
        'value': 0
    });
}
function show_lingshi_search_form() {
    var arg = QueryVar;
    if (CommonVar.act !== "search_lingshi" && !is_lingshi(arg.kindid)) {
        arg = {};
    }
    $("advance_search_panel").style.display = "block";
    $$('.advance_search_link').removeClass('on');
    $('lingshi_search').addClass('on');
    render_to_replace("advance_search_panel", "lingshi_search_templ", {
        "arg": arg
    });
    init_lingshi_select_box();
    $('sel_lingshi_type').addEvent('change', init_lingshi_select_box);
    basic_attr_keys = ['damage', 'defense', 'magic_damage', 'magic_defense', 'fengyin', 'anti_fengyin', 'speed'];
    for (var i = 0; i < basic_attr_keys.length; i++) {
        var key = basic_attr_keys[i];
        if (arg[key]) {
            $('sel_basic_attr_type').set('value', key);
            $('txt_lingshi_basic_attr_value').set('value', arg[key]);
            break;
        }
    }
    var saved_pos_cookie = Cookie.read('lingshi_search_add_attr_pos') || '';
    var saved_pos = saved_pos_cookie ? saved_pos_cookie.split(',') : [];
    var temp_map = {};
    var temp_count = 0;
    for (var i = 0; i < saved_pos.length; i++) {
        var attr = parseInt(saved_pos[i]);
        if (attr < 0) {
            continue;
        }
        temp_count++;
        if (attr == 0) {
            continue;
        }
        if (temp_map[attr]) {
            temp_map[attr] = temp_map[attr] + 1;
        } else {
            temp_map[attr] = 1;
        }
    }
    var is_match_saved = temp_count > 0;
    for (var key in temp_map) {
        var value = temp_map[key];
        if (value != arg['added_attr.' + key]) {
            is_match_saved = false;
            break;
        }
    }
    if (is_match_saved) {
        for (var i = 0; i < saved_pos.length; i++) {
            var attr = saved_pos[i];
            $('sel_add_attr' + (i + 1)).value = attr;
        }
    } else {
        var count = 1;
        for (var key in arg) {
            var m = key.match(/^added_attr\.(\d+)$/);
            var value = parseInt(arg[key]);
            for (; m && value > 0 && count <= 3; count++, value--) {
                $('sel_add_attr' + count).value = m[1];
            }
            if (count > 3) {
                break;
            }
        }
    }
    $('lingshi_level_min').set('value', arg['equip_level_min']);
    $('lingshi_level_max').set('value', arg['equip_level_max']);
    $('txt_lingshi_jinglian_level').set('value', arg['jinglian_level']);
    set_chk_fair_show(arg, 'lingshi');
}
function search_auto_complete(form_obj, ename_data) {
    var keyword = form_obj.search_text.value.trim();
    if (!keyword || keyword == "输入物品名称进行搜索") {
        alert("请输入物品名称进行搜索！");
        return false;
    }
    if (FairShowType == 'pass_fair_show') {
        CommonVar.act = 'type_query';
    } else {
        CommonVar.act = 'fair_show_type_query';
    }
    CommonVar.page = 1;
    query_var = {
        'search_text': keyword.toBase64()
    }
    CommonVar.query_order = "";
    query(CommonVar, query_var);
}
function set_chk_fair_show(arg, search_type) {
    if (FairShowType == 'pass_fair_show' && $('include_fair_show_panel')) {
        $('include_fair_show_panel').setStyle('display', '');
    }
    if (search_type == 'equip') {
        var search_acts = ['search_role_equip', 'search_pet_equip', 'search_material', 'search_stone', 'search_jl_stone', 'search_msyj_neidan'];
    } else if (search_type == 'pet') {
        var search_acts = ['search_pet'];
    } else if (search_type == 'lingshi') {
        var search_acts = ['search_lingshi']
    }
    if (search_acts.contains(CommonVar.act) && arg.pass_fair_show) {
        $('chk_include_fair_show').checked = false;
    } else {
        $('chk_include_fair_show').checked = true;
    }
}
function init_search_text() {
    var advance_search_box = $('advance_search_box');
    if (advance_search_box) {
        if (getPara('search_text')) {
            advance_search_box.value = decodeURIComponent(getPara('search_text')).fromBase64();
        } else {
            advance_search_box.value = '输入物品名称进行搜索';
        }
    }
}
function init_recommend_menu() {
    if (QueryVar["recommend_type"]) {
        var recommend_menu = $("menu_recommend_type_" + QueryVar["recommend_type"]);
        if (recommend_menu) {
            recommend_menu.addClass("on");
        }
    }
    var type_info = Cookie.read("recommend_typeids");
    if (!type_info) {
        if (!if_display_all_menu()) {
            $("menu_recommend_all").setStyle("display", "");
        }
        return;
    }
    $("menu_recommend").setStyle("display", "");
    var type_list = type_info.split(",");
    for (var i = 0; i < type_list.length; i++) {
        var el = $("menu_recommend_type_" + type_list[i]);
        el.getParent().getParent().setStyle("display", "");
    }
}
function init_equip_list_collect(refer) {
    $$('.equipListCollect').addEvent('click',
    function() {
        if (!IsLogin) {
            login_to_collect();
            return;
        }
        var _this = this;
        var game_ordersn = this.getAttribute('data-game_ordersn');
        var img_el = $('equip_img_' + game_ordersn);
        var _refer = img_el.getAttribute('data_collect_refer');
        if (!_refer) {
            _refer = refer;
        }
        window.collect_equip = {
            'price': img_el.getAttribute('data_price'),
            'equip_id': img_el.getAttribute('data_equipid'),
            'server_id': img_el.getAttribute('data_serverid'),
            'game_ordersn': game_ordersn,
            'collect_refer': _refer
        };
        if (this.hasClass('on')) {
            if (_this.get('removing')) {
                return;
            }
            _this.set({
                removing: true
            });
            collect_equip.del_collect_callback = function() {
                _this.removeClass('on');
                _this.erase('removing');
                var $num = _this.getNext('.equipListCollectNum');
                if ($num) {
                    var num = $num.get('text').trim();
                    if (/^\d*$/.test(num)) {
                        $num.set('text', Math.max( + num - 1, 0) || '');
                    }
                }
            };
            collect_equip.del_collect_error_callback = function() {
                _this.erase('removing');
            };
            del_from_favorites();
        } else {
            if (_this.get('favoring')) {
                return;
            }
            _this.set({
                favoring: true
            });
            collect_equip.add_collect_callback = function() {
                _this.addClass('on');
                var $num = _this.getNext('.equipListCollectNum');
                if ($num) {
                    var num = $num.get('text').trim();
                    if (/^\d*$/.test(num)) {
                        $num.set('text', Math.max( + num + 1, 0) || '');
                    }
                }
            };
            add_to_favorites(collect_equip, {
                complete: function() {
                    _this.erase('favoring');
                }
            });
        }
    });
    $$('.equipListCollect').each(function(el) {
        var game_ordersn = el.getAttribute('data-game_ordersn');
        var img_el = $('equip_img_' + game_ordersn);
        if (img_el) {
            var status = parseInt(img_el.getAttribute('data_status'));
            if ([1, 2, 3, 8].indexOf(status) < 0) {
                el.setStyle('visibility', 'hidden')
            }
        }
    });
}
function init_money_list() {
    update_link_status();
    $$('#soldList .btnBuy').filter(function(el) {
        return el.get('data_type') == StorageStype.money;
    }).set('html', '加入购物车').addEvent('click',
    function(e) {
        e.stop();
        if (this.hasClass('disabled')) {
            return;
        }
        if (!is_user_login()) {
            return alert_login();
        }
        var self = this;
        new Fingerprint2().get(function(device_id) {
            var params = {
                reonsale_identify: self.get('reonsale_identify'),
                equipid: self.get('equipid'),
                serverid: ServerInfo.server_id,
                device_id: device_id,
                safe_code: SafeCode,
                equip_refer: 64
            };
            ajax_buy(params, self);
        });
    });
    function ajax_buy(params, el_link) {
        var url = CgiRootUrl + '/usertrade.py?act=ajax_buy';
        var ajax = new Request.JSON({
            "url": url,
            "onSuccess": function(result) {
                if (result.status == AjaxConstants.Ok) {
                    update_link_status();
                    show_animation(el_link.parentElement.parentElement.getElement('img'));
                    new ToastTip('成功加入购物车').show();
                } else if (result.msg) {
                    new ToastTip(result.msg).show();
                } else {
                    location.href = el_link.href;
                }
            },
            onError: function(text, error) {
                alert('网络繁忙');
            },
            "noCache": true,
            "async": true
        });
        ajax.get(params);
    }
    function update_link_status() {
        var url = CgiRootUrl + '/userinfo.py?act=ajax_unpaid_orders';
        var ajax = new Request.JSON({
            "url": url,
            "onSuccess": function(result) {
                var ordersn_list = result.order_game_ordersn_list;
                if (result.status == AjaxConstants.Ok && ordersn_list) {
                    ordersn_list.each(function(ordersn) {
                        var el_link = $$('span[data-game_ordersn=' + ordersn + ']').getSiblings('.btnBuy')[0];
                        if (el_link) {
                            el_link.set('html', '已添加').addClass('disabled');
                        }
                    });
                    Cookie.write("unpaid_order_num", ordersn_list.length);
                    show_shop_cart_info();
                }
            },
            "noCache": true
        });
        ajax.get();
    }
    var StepAnimation = new Class({
        Extends: Fx.CSS,
        initialize: function(element, options) {
            this.element = this.subject = document.id(element);
            this.parent(options);
            this.options.onStep = options.onStep;
        },
        step: function(now) {
            if (this.options.frameSkip) {
                var diff = (this.time != null) ? (now - this.time) : 0,
                frames = diff / this.frameInterval;
                this.time = now;
                this.frame += frames;
            } else {
                this.frame++;
            }
            if (this.frame < this.frames) {
                var delta = this.transition(this.frame / this.frames);
                this.set(this.compute(this.from, this.to, delta));
                this.options.onStep && this.options.onStep(this.frame / this.frames, delta);
            } else {
                this.frame = this.frames;
                this.set(this.compute(this.from, this.to, 1));
                this.stop();
            }
        },
        start: function() {
            var from = {},
            to = {};
            return this.parent(from, to);
        }
    });
    function show_animation(el) {
        var pos_src = el.getPosition();
        var pos_target = $('buy_cart_panel').getPosition();
        var delta_x = pos_target.x - pos_src.x + 40;
        var delta_y = pos_target.y - pos_src.y - 10;
        var el_animation = new Element('img', {
            'src': el.get('src'),
            'styles': {
                'position': 'absolute'
            }
        });
        new StepAnimation(el_animation, {
            duration: 800,
            transition: Fx.Transitions.Back.easeOut,
            onStart: function() {
                el_animation.inject(document.body);
            },
            onStep: function(step, delta) {
                var size = 50 - 30 * step;
                el_animation.setStyles({
                    'top': pos_src.y + delta_y * delta * delta,
                    'left': pos_src.x + delta_x * step,
                    'width': size,
                    'height': size,
                    'opacity': 1 - 0.8 * step
                });
            },
            onComplete: function() {
                el_animation.destroy();
            }
        }).start();
    }
}
function init_list_filter() {
    var $root = $$('.qListFilter')[0];
    if (!$root) {
        return;
    }
    if (window.CommonVar) {
        if (CommonVar.act === 'recommend_search') {
            return $root.setStyle('display', 'none');
        }
    }
    $root.setStyle('display', 'block');
    var SPACE = ' ';
    var defaultSortName = 'recommend';
    var clsActive = 'on',
    clsDisabled = 'disabled',
    clsHide = 'hidden';
    function search(params) {
        goto_page(1, params);
    }
    var isMoneyTab = window.CheckVar && window.StorageStype && CheckVar.cur_storage_type == StorageStype.money ? true: false;
    var $tabRoot = isMoneyTab ? $$('#qFiltersMoney')[0] : $$('#qFiltersNotMoney')[0];
    if (window.CommonVar) {
        var queryOrder = CommonVar.query_order || 'selling_time DESC';
        if (gQuery.isDefaultSort) {
            queryOrder = defaultSortName;
        }
        var queryOrders = queryOrder.split(SPACE);
        var queryType = queryOrders[0];
        var querySort = queryOrders[1] || '';
        var $li = $tabRoot.getElement('[data-name=' + queryType + ']');
        if ($li) {
            var $link = $li.getElement('.text').addClass(clsActive);
            var title;
            if ($link.get('data-sort')) {
                title = $link.get('title');
                $link.erase('title');
            } else {
                var $a = $li.getElement('.dropItem [data-sort=' + querySort + ']');
                if ($a) {
                    title = $a.get('text').trim();
                    $a.getParent('li').addClass(clsHide).getParent('ul').addClass('hover');
                }
            }
            if (title) {
                $link.set('html', title);
            }
        }
    }
    $tabRoot.removeClass(clsHide);
    $root.addEvents({
        'click:relay(a[data-sort])': function(e) {
            e.stop();
            if (this.hasClass('on')) {
                return;
            }
            var $pt = this.getParent('[data-name]');
            var sortName = $pt.get('data-name');
            var sortType = this.get('data-sort');
            search({
                query_order: sortName == defaultSortName ? '': [sortName, sortType].join(SPACE)
            });
        }
    });
    var dropTimer;
    $root.addEvents({
        'mouseenter:relay(.dropSwitch)': function() {
            clearTimeout(dropTimer);
            var $pt = this.getParent();
            var css = {
                display: 'block'
            };
            if (window.Browser && Browser.ie7) {
                css.width = $pt.getWidth();
            }
            $pt.getElement('.dropList').setStyles(css);
        },
        'mouseleave:relay(.dropSwitch)': function() {
            clearTimeout(dropTimer);
            dropTimer = setTimeout(function() {
                this.getParent().getElement('.dropList').setStyle('display', 'none');
            }.bind(this), 10);
        },
        'mouseover:relay(.dropList)': function() {
            clearTimeout(dropTimer);
        },
        'mouseleave:relay(.dropList)': function() {
            clearTimeout(dropTimer);
            this.setStyle('display', 'none');
        }
    });
    $root.addEvents({
        'mouseenter:relay(.priceRange)': function() {
            this.addClass('active');
        },
        'mouseleave:relay(.priceRange)': function() {
            this.removeClass('active');
        },
        'click:relay(.priceRange .text)': function() {
            this.getParent().getElement('input').focus();
        },
        'keypress:relay(.priceRange input)': function(e) {
            if (e.key === 'enter') {
                var $btn = this.getParent('.priceRange').getElement('.searchBtn');
                $btn && $btn.click();
            }
            if (!Browser.firefox) {
                var ch = String.fromCharCode(e.event.keyCode);
                if (/\D/.test(ch)) {
                    e.stop();
                }
            }
        },
        'click:relay(.priceRange .searchBtn)': function(e) {
            e.stop();
            var $inputs = $root.getElements('.priceRange input'),
            $inMin = $inputs[0],
            $inMax = $inputs[1];
            var min = $inMin.value.trim(),
            max = $inMax.value.trim();
            if (/\D/.test(min) || /\D/.test(max)) {
                return rangeTip('请正确填写价格');
            }
            if (parseInt(min) > MaxTradeYuan || parseInt(max) > MaxTradeYuan) {
                return rangeTip('价格范围为: 0 -1000000');
            }
            var _min = +min,
            _max = +max;
            if (min !== '' && max !== '') {
                _min = Math.min(min, max);
                _max = Math.max(min, max);
            }
            var params = {
                price_min: _min ? _min * 100 : '',
                price_max: _max ? _max * 100 : ''
            };
            search(params);
        }
    });
    var $rangeTip = null,
    rangeTimer;
    function rangeTip(msg) {
        if (!$rangeTip) {
            $rangeTip = new FloatTip($root.getElement('.priceRange'), {
                dir: 'right',
                x: 10,
                y: -2
            });
        }
        clearTimeout(rangeTimer);
        rangeTimer = setTimeout(function() {
            $rangeTip.hide(false);
        },
        2000);
        $rangeTip.show(msg);
    }
    if (window.QueryVar) {
        var $inpPrices = $root.getElements('.priceRange input'); [QueryVar.price_min, QueryVar.price_max].each(function(val, i) {
            $inpPrices[i] && $inpPrices[i].set('value', val ? val / 100 : '');
        });
    }
    var $pager = $root.getElement('.qPager');
    var pCurrent = +$pager.get('data-cur'),
    pTotal = +$pager.get('data-total');
    if (isNaN(pCurrent) || isNaN(pTotal)) {
        $pager.addClass(clsHide);
    } else {
        $pager.getElement('.info').set('html', pCurrent + '/' + pTotal);
        var isFirstPage = pCurrent == 1,
        isLastPage = pCurrent == pTotal;
        if (!isFirstPage) {
            $pager.getElement('.pPrev').removeClass(clsDisabled).addEvent('click',
            function() {
                goto_page(pCurrent - 1);
            });
        }
        if (!isLastPage) {
            $pager.getElement('.pNext').removeClass(clsDisabled).addEvent('click',
            function() {
                goto_page(pCurrent + 1);
            });
        }
    }
}