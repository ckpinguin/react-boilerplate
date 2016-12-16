import React from 'react';

export default function NavBar() {
    var pages = [
        'home',
        'blog',
        'pics',
        'bio',
        'art',
        'shop',
        'about',
        'contact'
    ];
    var navLinks = pages.map(function(page) {
        return (
                <a href={'/' + page}>
                    {page}
                </a>
        );
    });

    return <nav>{navLinks}</nav>;
}
