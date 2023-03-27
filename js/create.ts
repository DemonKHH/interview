// object.create 实现
const create = (proto: any) => {
    let F = () => {}
    F.prototype = proto
    F.prototype.constructor = F
    return new F()
}