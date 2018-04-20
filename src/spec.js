const generator = require('brudie');
const {
    TokGen,
    ModeGen,
    rule,
    getInterpreter,
    ENV
} = generator;

/*
 * token
 */

const method = new TokGen({
    MATCH: /^(GET|POST)/,
    type: 'method',
    eval: function () {
        return this.value;
    }
});
const version = new TokGen({
    MATCH: /^HTTP\/1\.1/,
    type: 'version',
    eval: function () {
        return this.value;
    }
});
const path = new TokGen({
    MATCH: /^[a-zA-Z\/\-\.]+/,
    type: 'path',
    eval: function () {
        return this.value;
    }
});
const str = new TokGen({
    MATCH: /^[^\r\n]+/,
    type: 'str',
    eval: function () {
        return this.value;
    }
});
const head = new TokGen({
    MATCH: /^[a-zA-Z\/\-]+/,
    type: 'head',
    eval: function () {
        return this.value;
    }
});
const punc = new TokGen({
    MATCH: /^[\:\r\n\s]/,
    type: 'punc',
    isStrictEqual: true,
    isHiddenInAST: true
});
const html = new TokGen({
    MATCH: /^[^(\`\`\`)]+/,
    type: 'html',
    eval: function () {
        return this.value;
    }
});


//有限状态机添加及自动检测迫在眉睫！！！！

const mode = new ModeGen({
    switch: function (token) {
        if(this.isState("default")){
            if (token === '\n')
               this.switch("head");
        }

        if(this.isState("value")){
            if (token === '\n')
               this.switch("head");
        }

        if(this.isState("head")){
            if (token === ' ')
               this.switch("value");
        }
    },
    rule: {
        value: [str,punc],
        head: [punc,head],
        default: [method, version, path, punc]
    }
});
// 字符串值匹配需要限制下使用，比如必须以调用形式！！！11
// 报错信息转义字符需要处理！！@！！！
var request = rule('request').add(method('GET')).add(punc(' ')).add(path).add(punc(' ')).add(version).add(punc('\r')).add(punc('\n')).setEval(
    function () {
        var arr = this.getChildren();

        return {
            method: arr[0].eval(),
            path: arr[1].eval(),
            version: arr[2].eval()
        };
    }
);

var header = rule('header').add(head).add(punc('\:')).add(punc(' ')).add(str).add(punc('\r')).add(punc('\n')).setEval(
    function () {
        var arr = this.getChildren();

        return {
            key: arr[0].eval(),
            value: arr[1].eval()
        };
    }
);

var http = rule('http').add(request).repeat(header).add(punc('\r')).add(punc('\n')).setEval(
    function () {
        var req = {};

        var arr = this.getChildren();
        var top = arr[0].eval();

        req.method = top.method;
        req.path = top.path;
        req.version = top.version;
        req.headers = [];

        for(var i=1;i<arr.length;i++)
            req.headers.push(arr[i].eval());

        return req;
    }
);

module.exports = getInterpreter(mode,http);
