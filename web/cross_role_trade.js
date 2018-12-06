var CrossRoleTradeOperator = new Class({
    MAX_ROLE_BUY_COUNT: 5,
    initialize: function(options) {
        options = Object.merge({
            btnId: 'btn_buy',
            buyText: '下单购买',
            loginText: '登录购买'
        },
        options || {});
        var btn = $(options.btnId);
        var self = this;
        if (!equip["is_selling"]) {
            btn.setStyle("display", "none");
            return;
        }
        if (LoginInfo && LoginInfo.login) {
            btn.addEvent("click",
            function() {
                var buy_hook = btn.getAttribute("data_buy_hook");
                if (buy_hook) {
                    if (!eval(buy_hook + "()")) {
                        return false;
                    }
                }
                var roleCount = parseInt(btn.get('data_role_count')) || 0;
                if (roleCount >= self.MAX_ROLE_BUY_COUNT) {
                    if (window.confirm('少侠，您所在的服务器已经有' + self.MAX_ROLE_BUY_COUNT + '个角色，购买的新角色要在游戏中删除一个已有角色方可取出。') == false) {
                        return false;
                    }
                }
                var serverid = LoginInfo["server_id"];
                if (!serverid) {
                    serverid = LoginInfo["serverid"];
                }
                self.check_have_unpaid_cross_server_orders(serverid);
                return false;
            });
            this.set_button_txt(btn, options.buyText);
        } else {
            btn.addEvent("click",
            function() {
                self.show_popup_select_server_box();
                return false;
            });
            this.set_button_txt(btn, options.loginText);
        }
    },
    check_have_unpaid_cross_server_orders: function(serverid) {
        var self = this;
        var url = CgiRootUrl + '/usertrade.py?act=ajax_have_unpaid_cross_server_orders&obj_serverid=' + equip["server_id"];
        var Ajax = new Request.JSON({
            "url": url,
            "onSuccess": function(res) {
                if (res.status && res.has_cross_server_order == 1 && res.is_cross_server_order) {
                    self.show_has_cross_order_modal(serverid);
                } else {
                    window.location.href = self.get_add_order_url(serverid, false);
                }
            },
            "onError": function() {
                window.location.href = self.get_add_order_url(serverid, false);
            }
        });
        Ajax.get();
    },
    show_has_cross_order_modal: function(serverid) {
        $$('#hasCrossOrderModal,#hasCrossorderMask').setStyle('display', 'block');
        this.handle_cross_order_modal_btn(serverid);
    },
    hide_has_cross_order_modal: function() {
        $$('#hasCrossOrderModal,#hasCrossorderMask').setStyle('display', 'none');
    },
    handle_cross_order_modal_btn: function(serverid) {
        var self = this;
        $('continuteBuy').addEvent('click',
        function() {
            window.location.href = self.get_add_order_url(serverid, true);
        });
        $('closeCrossModal').addEvent('click',
        function() {
            self.hide_has_cross_order_modal();
        });
    },
    set_button_txt: function(btn, btn_txt) {
        btn.set("value", btn_txt);
    },
    get_add_order_url: function(login_serverid, isForceAddOrder) {
        var equip_refer = getPara('equip_refer') var arg = {
            "device_id": get_fingerprint(),
            "equip_refer": equip_refer,
            "view_loc": window.equip_refer_loc
        };
        if (login_serverid == equip["server_id"]) {
            Object.append(arg, {
                "act": "buy",
                "equipid": equip["equipid"],
                "safe_code": SafeCode
            });
        } else {
            Object.append(arg, {
                "act": "add_cross_buy_role_order",
                "obj_serverid": equip["server_id"],
                "obj_equipid": equip["equipid"]
            });
            if (isForceAddOrder) {
                arg.force_add_cross_server_order = 1;
            }
        }
        return CgiRootUrl + "/usertrade.py?" + Object.toQueryString(arg);
    },
    chose_server: function(args) {
        var equip_refer = getPara('equip_refer');
        var view_loc = getPara('view_loc');
        var isOverall = (args["server_id"] != equip["server_id"]);
        var equip_detail_url = HomePage + "/equip?s=" + equip["server_id"] + "&eid=" + equip["eid"];
        isOverall && (equip_detail_url += "&o");
        equip_refer && (equip_detail_url += "&equip_refer=" + equip_refer);
        view_loc && (equip_detail_url += "&view_loc=" + view_loc);
        var login_arg = {
            "server_id": args["server_id"],
            "server_name": args["server_name"],
            "area_id": args["area_id"],
            "area_name": args["area_name"],
            "return_url": equip_detail_url,
            "act": "show_login"
        };
        var url = HttpsCgiRootUrl + "/show_login.py?" + Object.toQueryString(login_arg);
        window.location.href = url;
    },
    show_popup_select_server_box: function() {
        var tmpl = ['<div class="blockCont">', '<div id="area_list_panel"></div>', '<div class="blank12"></div>', '<div id="server_list_panel"></div>', '<div class="serverTips" id="not_allow_buy_tips">', '请选择任意有角色的服务器登录购买', '</div>', '</div>'].join('');
        this.dialog = new PopupDialog("选择服务器", tmpl);
        var self = this;
        var obj = new SelectServer(self.chose_server.bind(self), null);
        obj.show();
        self.dialog.show();
    }
});