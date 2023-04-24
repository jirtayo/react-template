import { urlQuery } from "./urlQuery";

export default {
  /**
   * 外部webview通过deeplink打开app
   * 严格来讲这不属于bridge，但是为了方便，放在这里
   * 允许不提供actionKey，不提供的话默认为app当前页面
   */
  openApp(query?: Record<string, string>) {
    // ios 4.6.20 的版本以前 只支持actionkey放在第一个参数
    // 这里为了兼容低版本ios 统一把第一个参数改为actionKey
    let appQueryStr = "";
    if (query) {
      const { actionKey, ...other } = query;
      appQueryStr = urlQuery.stringify(
        { actionKey, ...other },
        { addQueryPrefix: true }
      );
    }

    let url: string;
    if ("isAndroid()") {
      url = `silvrr://silvrr.akulaku.com${appQueryStr}`;
    } else {
      url = `akulaku://akulaku${appQueryStr}`;
    }
    console.log("[openApp]: url", url);
    // location.href = url
    // 在京东app的场景下，未下载app将导致跳转到了打开失败的页面，这里使用iframe来解决
    // 如果希望 URL Scheme 出错时，唤端不会跳转到错误页面，那么可以使用 iframe 的形式，不过需要注意个别机型的兼容性
    // if (!iframe) {
    //   iframe = document.createElement('iframe')
    //   iframe.style.cssText = 'display:none;border:0;width:0;height:0;'
    //   document.body.append(iframe)
    // }
    // iframe.src = url
  },

  /**
   * 下载app
   */
  downloadApp() {
    const config = {
      android: "下载页",
      ios: "下载页",
    };
    if ("bridge.isAkulaku") {
      // 在app内的话，安卓需要用这个才能跳转到应用商店
      config.android = `market://details?id=io.silvrr.installment`;
    }

    const url = "isAndroid()" ? config.android : config.ios;
    // log(`downloadApp，开始下载app，url:`, url)
    location.href = url;
  },
};
