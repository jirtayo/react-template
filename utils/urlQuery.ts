import qs from "qs";
import url from "url";

/**
 * 给 url query 添加参数，并且返回添加后的url，存在的key进行修改，没有的进行添加
 * example:
 *  1. addQueryToUrl('http://www.baidu.com?name=old&age=18',{name:'lisi'})
 *     ↓↓↓↓↓↓
 *     http://www.baidu.com?name=lisi&age=18
 *  2. addQueryToUrl('?name=old&age=18',{name:'lisi'})
 *     ↓↓↓↓↓↓
 *     ?name=lisi&age=18
 * @param {string} targetUrl url 地址
 * @param {Object} query 需要添加的参数
 * @returns {string}
 */
export function addQueryToUrl(targetUrl: string, query: any) {
  const t = url.parse(targetUrl);
  const oldQuery = urlQuery.parse(t.query ?? "");
  t.search = urlQuery.stringify({ ...oldQuery, ...query });
  return url.format(t);
}

export const urlQuery = {
  stringify(query?: any, options?: qs.IStringifyOptions): string {
    return qs.stringify(query, {
      format: "RFC1738",
      ...options,
    });
  },
  parse<T = any>(search: string, options?: qs.IParseOptions): T | undefined {
    if (!search) {
      return;
    }
    return qs.parse(search, {
      ignoreQueryPrefix: true,
      ...options,
    }) as unknown as T;
  },
  addQueryToUrl,
};
