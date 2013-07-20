var fis = module.exports = require('fis');

fis.cli.name = "fis-webapp";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            'tpl': 'extlang'
        },
        optimizer : {
            tpl : 'smarty-xss'
        },
        postpackager: 'ext-map'
    },
    roadmap : {
        ext : {
            less : 'css'
        },
        path : [
            {
                reg : '**.tpl',
                isMod : true,
                url : '${namespace}$&',
                release : '/template/${namespace}$&'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/${namespace}/widget/$1'
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg: /^\/(static|config|test)\/(.*)/i,
                release: '/$1/${namespace}/$2'
            },
            {
                reg : /^\/(plugin|server\.conf$)|\.php$/i
            },
            {
                reg: "domain.conf",
                release: '/config/$&'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg: /^.+$/,
                release: '/static/${namespace}$&'
            }
        ]
    },
    settings : {
        parser : {
            bdtmpl : {
                LEFT_DELIMITER : '<#',
                RIGHT_DELIMITER : '#>'
            }
        },
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});
