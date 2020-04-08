module.exports = class JsFile {
    constructor(obj, type) {
        this.className = obj.name;
        this.extends = obj.__proto__.name;
        this.type = Object.prototype.toString.call(obj)
        // this.content = fs.readFileSync(this.file, 'utf8')
    }

}
