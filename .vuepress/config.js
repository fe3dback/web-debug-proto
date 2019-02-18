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
    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-133622526-1'
            }
        ]
    ],
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
            { text: 'Contact', link: '/contact/' },
            { text: 'License', link: '/license/' },
        ],
        displayAllHeaders: false,
        sidebarDepth: 2,
        sidebar: {
            '/docs/': [
                '',
                './specification/',
                {
                    title: 'Latest Scheme (0.0.A)',
                    collapsable: false,
                    children: [
                        '/docs/scheme/',
                        '/docs/scheme/types',
                    ]
                },
                {
                    title: 'Guides',
                    collapsable: false,
                    children: [
                        './server-side/',
                    ]
                },
            ],

            '/implementations/': [
                '',
            ],
        }
    }
};
