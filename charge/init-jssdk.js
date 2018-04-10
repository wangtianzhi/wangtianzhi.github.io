$(document).ready(function () {
	var timestamp;
	var nonceStr = "";
	var signature = "";
	var is_applied = "";
	var appid = "";

	$.ajax({
		type: 'post',
		// url: 'https://api.network.cugapp.com/api/platform/wechat/mp/mixed/get_jssdk_config_and_userinfo',
		url: 'http://apidoc.cugapp.com/html/web/controller/share/share.html#5ac2176497677e3c8b3d33df',
		data: {
			'mp_wechat_id': "cugapp",
			'url': window.location.href
		},
		async: false,
		cache: false,
		dataType: 'JSON',
		success: function (data) {
			var jssdklist = data.jssdk_sign_package;
			console.log(jssdklist);
			timestamp = jssdklist.timestamp;
			nonceStr = jssdklist.nonceStr;
			signature = jssdklist.signature;
			appid = jssdklist.appId;
			wx.config({
				debug: false,
				appId: appid,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ['checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'hideMenuItems',
					'showMenuItems',
				]
			});
		}
	})

	var u_title = "角闪石君帮您充值一卡通";
	var u_desc = "一个微小的非官方地大一卡通充值页面"
	var u_link = "https://confession.cugapp.com/Confession/?work_url=http://pages.icug.net.cn/charge/index.html";
	var u_img_link = "http://time-capsule.icug.net.cn/img/avatar.jpg";

	wx.ready(
		function () {
			wx.onMenuShareAppMessage({
				title: u_title,
				desc: u_desc,
				link: u_link,
				imgUrl: u_img_link,
				trigger: function (res) {
				},
				success: function (res) {
					alert('已分享');
					ga('send', 'event', 'jssdk', 'Share', 'Friend');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});

			// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

			wx.onMenuShareTimeline({
				title: u_title,
				desc: u_desc,
				link: u_link,
				imgUrl: u_img_link,
				trigger: function (res) {
				},
				success: function (res) {
					alert('已分享');
					ga('send', 'event', 'jssdk', 'Share', 'TimeLine');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});


			// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

			wx.onMenuShareQQ({
				title: u_title,
				desc: u_desc,
				link: u_link,
				imgUrl: u_img_link,
				trigger: function (res) {
				},
				complete: function (res) {
					alert(JSON.stringify(res));
				},
				success: function (res) {
					alert('已分享');
					ga('send', 'event', 'jssdk', 'Share', 'QQ');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});


			// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口


			wx.onMenuShareWeibo({
				title: u_title,
				desc: u_desc,
				link: u_link,
				imgUrl: u_img_link,
				trigger: function (res) {
				},
				complete: function (res) {
					alert(JSON.stringify(res));
				},
				success: function (res) {
					alert('已分享');
					ga('send', 'event', 'jssdk', 'Share', 'Weibo');

				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});

			wx.onMenuShareQZone({
				title: u_title,
				desc: u_desc,
				link: u_link,
				imgUrl: u_img_link,
				trigger: function (res) {
				},
				complete: function (res) {
					alert(JSON.stringify(res));
				},
				success: function (res) {
					alert('已分享');
					ga('send', 'event', 'jssdk', 'Share', 'Qzone');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});
		});
});
