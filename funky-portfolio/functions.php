<?php
function funky_portfolio_scripts() {
    wp_enqueue_style('funky-style', get_stylesheet_uri());
    wp_enqueue_script('funky-script', get_template_directory_uri() . '/script.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'funky_portfolio_scripts');

function funky_portfolio_setup() {
    register_nav_menus( array(
        'primary' => __('Primary Menu', 'funky'),
    ) );
}
add_action('after_setup_theme', 'funky_portfolio_setup');
?>
