export class Utils {
static copyDeep(obj: any): any {
    if (obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    return obj;
  }
}