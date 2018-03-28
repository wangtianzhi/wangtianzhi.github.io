var beforeMoney;

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

function validMoney(money) {
	var reg = new RegExp("^[0-9]+(.[0-9]{1})?$");
	return reg.test(money);
}

$.showLoading = function (text) {
	var html = '<div class="weui_loading">';
	for (var i = 0; i < 12; i++) {
		html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
	}
	html += '</div>';
	html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
	show(html, 'weui_loading_toast');
}

$.hideLoading = function () {
	hide();
}

$(document).ready(function () {
	var openid = getQueryString("openid");
	var code = getQueryString("code");
	var password = "";

	$("#money-page").hide();
	$("#success").hide();

	$("#money-text").focus(function (event) {
		$("span").hide();
	}).focusout(function (event) {
		$("span").show();
	});

	if (openid == null) {
		location.replace("http://time-capsule.icug.net.cn/qrcode.html");
	}
	var mytime = new Date();
	if (mytime.getHours() > 23 || mytime.getHours() < 6 || (mytime.getHours() == 22 && mytime.getMinutes() >= 30)) {
		$.alert("请注意，22:30到6:00间系统无法充值，仅可查询一卡通余额。");
	}

	$("#password-sure").click(function () {
		password = $("#password").val();
		if (!password) {
			$.toast("请输入密码", "cancel");
			return;
		}
		$.showLoading();
		$.ajax({
			url: "http://card-service.icug.net.cn/accountinformation?" + "openid=" + openid + "&pwd=" + password,
			type: "GET",
			dataType: "json",
			success: function (res) {
				$.hideLoading();
				if (res.status == 0) {
					$.toast("登录成功")
					$("#password-page").toggle();
					$("#money-page").toggle();
					balance = parseInt(res.db_balance);
					unsettleMoney = parseInt(res.unsettle_amount);
					beforeMoney = balance / 100;
					dislplay_balance = (balance / 100) + " 元";
					dislplay_unsettle = (unsettleMoney / 100) + " 元";
					$("#left-money").replaceWith(dislplay_balance);
					$("#unsettle-money").replaceWith(dislplay_unsettle);
				} else {
					$.toast("查找不到用户", "cancel");
					return;
				}
			},
			error: function (res) {
				$.hideLoading();
				$.toast("网络故障，请重试", "cancel");
				return;
			}
		})
	});
	$("#charge-button").click(function () {
		var money = $("#money-text").val();
		if (money == "大智最帅") {
			$.toast("我觉得也是");
			$("#money-text").val("");
			return;
		}
		if (!validMoney(money) && money != "") {
			$.toast("请输入正确格式的金额", "cancel");
			return;
		}
		if (parseInt(money) > 500 || parseInt(money) < 0) {
			$.toast("金额不符合要求", "cancel");
			return;
		}

		//如果没有填写，则找到选择的金额
		if (money == "") {
			var money = $(":checked").parent().prev().children('p').text();
			;
		}

		money = parseFloat(money);
		money *= 100;
		password = $("#password").val();
		console.log(money);

		$.confirm("确认充值" + money / 100 + "元吗？",
			function () {
				$.showLoading();
				$.ajax({
					url: "http://card-service.icug.net.cn/accountmoney",
					type: "POST",
					dataType: "json",
					data: {
						"openid": openid,
						"pwd": password,
						"money": money
					},
					success: function (res) {
						$.hideLoading();
						if (res.status == 0) {
							$("#money-page").hide();
							$("#success").show();
							var newMoney = parseFloat(beforeMoney) + parseInt(money / 100);
							$("#success-left-money").html("已成功充值" + money / 100 + "元，下次消费后转入卡余额中");
						} else {
							console.log(money);
							console.log(res.status);
							$.toast("充值失败", "cancel");
						}
					},
					error: function (res) {
						$.hideLoading();
						$.toast("网络故障，请重试", "cancel");
					}
				});
			},
			function () {
			});
	});
});