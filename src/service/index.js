import http from "../unitls/https";
export const Logines = (data) => http.post("/api/login", data);
export const getRouters = () => http.get("/api/getRouters");
// 部门
export const systemDept = () => http.get("/api/system/dept/list");
//用户管理
export const sysUser = () => http.get("/api/system/user/list");
//专家意见
export const doctor = () => http.get("/api/business/Doctor/list");
//意见反馈
export const feedback = () => http.get("/api/business/Feedback/list");
// 楼层管理
export const foordata = () => http.get("/api/business/Foordata/list");
// 科室管理
export const dept = () => http.get("/api/business/Dept/list");
// 菜单
export const menu = () => http.get("/api/system/menu/list");
//订单
export const order = () => http.get("/api/business/Payorder/list");
// 身体部位
export const businessBodypartsList = () => http.get("/apisiness/Bodypartsst");
export const businessBodyparts = (data) =>
  http.post("/apisiness/Bodyparts", data);
export const businessBodypartsIds = (params) =>
  http.get("/apisiness/Bodyparts", { params });
// 就诊卡
export const businessCard = () => http.get("/apisiness/Cardsst");
// 症状
export const businessSymptomsList = () => http.get("/apisiness/Symptomsst");
export const businessSymptoms = (data) =>
  http.post("/apisiness/Symptoms", data);
// 操作日志
export const monitorOperlogList = () => http.get("/api/monitor/operlogst");
// 登录日志
export const monitorLogininforList = () =>
  http.get("/api/monitor/logininforst");
// 退款
export const getRole = () => http.get("/api/system/rolest");
// 角色分配
export const userrole = () => http.get("/api/system/userRole/get/{roleId}");
// 添加角色
export const addrole = (data) => http.post("/api/system/role/edit", data);
// 字典
export const dictionary = () => http.get("/api/system/dict/data/list");
// 添加字典
export const addnary = (data) => http.post("/api/system/dict/data", data);
// 修改字典
export const eitnary = (data) => http.put("/api/system/dict/data", data);
// 删除字典
export const delnary = (dictcode) =>
  http.delete(`/api/system/dict/data/${dictcode}`);
// 参数
export const config = () => http.get("/api/system/config/list");
// 添加参数
export const addconfig = (data) => http.post("/api/system/config", data);
// 更新参数
export const eitconfig = (data) => http.put("/api/system/config", data);
//删除参数
export const delconfig = (ids) => http.delete(`/api/system/config/${ids}`);
// 岗位
export const postwork = () => http.get("/api/system/post/list");
