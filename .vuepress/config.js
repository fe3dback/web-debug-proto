module.exports = {
    base: '/web-debug-proto/',
    title: 'Web Debug Protocol',
    description: 'Union debug protocol for modern web applications. Any language, any framework.',
    markdown: {
        lineNumbers: false,
        toc: {
            includeLevel: [1, 2, 3]
        }
    },
    themeConfig: {
        repo: 'fe3dback/http-debug-tools',
        repoLabel: 'HTTP Debug Client App',

        docsRepo: 'fe3dback/web-debug-proto',
        docsDir: '',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page on github',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/' },
            { text: 'Implementations', link: '/implementations/' },
        ],
        displayAllHeaders: true,
        sidebarDepth: 2,
        sidebar: {
            '/docs/': [
                '',
                {
                    title: 'Scheme',
                    collapsable: false,
                    children: [
                        '/docs/scheme/',
                        '/docs/scheme/types',
                    ]
                },
            ],

            '/implementations/': [
                '',
            ],
        }
    }
};
