module.exports = {
    title: 'Web Debug Protocol',
    description: 'Union debug protocol for modern web applications. Any language, any framework.',
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [1, 2, 3]
        }
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/' },
            { text: 'Implementations', link: '/implementations/' },
        ],
        displayAllHeaders: true,
        sidebar: {
            '/docs/': [
                '',
                {
                    title: 'Scheme',
                    collapsable: false,
                    children: [
                        '/docs/types/',
                        '/docs/types/place',
                        '/docs/types/guid',
                    ]
                },
            ],

            '/': [
                '',
                'docs',
                'implementations'
            ]
        }
    }
};
