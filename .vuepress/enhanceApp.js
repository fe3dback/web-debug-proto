export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    // @todo move this to *.json files and load from it
    options.appExtension = {
        "@type-location": [
            {
                "key": "file",
                "type": "rel_path",
                "required": true,
                "description": "relative path to project root",
                "example": "\"/src/renderer/main.js\""
            },
            {
                "key": "line",
                "type": "int",
                "required": false,
                "description": "line in file",
                "example": "123"
            },
            {
                "key": "pos",
                "type": "int",
                "required": false,
                "description": "cursor position in line (work only if \"line\" defined)",
                "example": "56"
            },
            {
                "key": "pos_end",
                "type": "int",
                "required": false,
                "description": "cursor end position in line (work only if \"pos\" defined)",
                "example": "56"
            }
        ]
    };
}
