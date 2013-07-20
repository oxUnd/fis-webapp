var fis = module.exports = require('fis');

fis.cli.name = "fis-webapp";

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
                reg : /^\/test\//i
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg: /\/static\/(.*)/i,
                release: '/static/${namespace}/$1'
            },
            {
                reg: /\/widget\/.*?\.(?:css|js)$/i,
                isMod: true,
                release: '/static/${namespace}$&'
            },
            {
                reg: /\/(widget)\/(.*?\.tpl)$/i,
                isMod: true,
                url: '${namespace}$&',
                release: '/template/${namespace}$&'
            },
            {
                reg: /\/.+?\.tpl$/i,
                isMod: true,
                release: '/template/${namespace}$&'
            },
            {
                reg: /\.(php)$/i
            },
            {
                reg : /^\/plugin\//i
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg: "server.conf",
                release: '/$&'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg: /\/.+/i,
                release: '/static$&'
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
        },
        optimizer : {
            'smarty-xss' : {
                'escapeMap' : {
                    'js' : 'f_escape_js',
                    'html' : 'f_escape_xml',
                    'data' : 'f_escape_data',
                    'path' : 'f_escape_path',
                    'event' : 'f_escape_event',
                    'no_escape' : 'escape:none'
                },
                'leftDelimiter' : '{%',
                'rightDelimiter' : '%}'
            }
        }
    }
});
