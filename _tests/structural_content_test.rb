require 'cgi'

ROOT = File.expand_path('..', __dir__)
SITE = File.join(ROOT, '_site')

def assert(condition, message)
  abort message unless condition
end

def site_file(path)
  File.join(SITE, path)
end

required_files = %w[
  index.html
  publications/index.html
  cv-json/index.html
  sitemap/index.html
  404.html
  about/index.html
  about.html
  resume-json.html
  sitemap.xml
  feed.xml
]

required_files.each do |path|
  assert File.file?(site_file(path)), "Missing generated route: #{path}"
end

homepage = CGI.unescapeHTML(File.read(site_file('index.html')))
cv_page = CGI.unescapeHTML(File.read(site_file('cv-json/index.html')))
main_css = File.read(site_file('assets/css/main.css'))

[
  'PhD student in Computer Science at The Ohio State University',
  'Zhihui Zhu',
  'MMLS 2026 Traveling Award',
  'NAIRR260106',
  'zhu.3944@osu.edu',
  'U55yracAAAAJ',
  '0009-0000-3068-0754',
  'github.com/xzAscC'
].each do |content|
  assert homepage.include?(content), "Homepage lost required content: #{content}"
end

['Ohio State', 'University of Electronic Science'].each do |content|
  assert cv_page.include?(content.tr('\\', '')), "CV lost required content: #{content}"
end

publication_pages = Dir.glob(site_file('publications/*/index.html'))
assert publication_pages.length == 4, "Expected 4 publication detail pages, found #{publication_pages.length}"
publication_html = publication_pages.map { |path| CGI.unescapeHTML(File.read(path)) }

Dir.glob(File.join(ROOT, '_publications', '*.md')).each do |source|
  title = File.read(source)[/^title:\s*["']?(.*?)["']?\s*$/, 1]
  detail_exists = title && publication_html.any? { |html| html.include?(title) }
  assert detail_exists, "Missing publication detail page for: #{title || source}"
end

nav_source = File.read(File.join(ROOT, '_includes', 'editorial-nav.html'))
scripts_source = File.read(File.join(ROOT, '_includes', 'scripts.html'))
assert !nav_source.include?('<script>'), 'Theme behavior must live in the shared dark-toggle module'
assert nav_source.include?('site-nav__menu'), 'Primary navigation must provide a mobile disclosure menu'
assert scripts_source.scan('dark-toggle.js').length == 1, 'Dark toggle module must load exactly once'
assert !scripts_source.include?('main.min.js'), 'Editorial pages must not load the legacy theme bundle'

active_layouts = %w[default.html single.html archive.html].map do |name|
  File.read(File.join(ROOT, '_layouts', name))
end.join("\n")
%w[sidebar.html page__hero.html breadcrumbs.html browser-upgrade.html].each do |legacy_include|
  assert !active_layouts.include?(legacy_include), "Active layouts still depend on legacy include: #{legacy_include}"
end

single_layout = File.read(File.join(ROOT, '_layouts', 'single.html'))
about_source = File.read(File.join(ROOT, '_pages', 'about.md'))
about_front_matter, about_body = about_source.split(/^---\s*$\n?/, 3).last(2)
assert single_layout.include?('page.intro'), 'Homepage hero must read its introduction from page front matter'
assert about_front_matter.include?('intro:'), 'Homepage front matter must define its hero introduction'
assert about_front_matter.include?('interests:'), 'Homepage front matter must define research interest pills'
assert !about_body.match?(/^#\s+Xudong Zhu\s*$/), 'Homepage body must not repeat the hero heading'

assert homepage.include?('site-hero'), 'Missing editorial hero markup'
assert homepage.include?('interest-pill'), 'Missing research interest pills'
assert homepage.include?('theme-toggle'), 'Missing theme toggle'
assert main_css.include?('Crimson Pro'), 'Missing Crimson Pro typography'
assert main_css.include?('Inter'), 'Missing Inter typography'
assert main_css.include?('--color-bg'), 'Missing background design token'
assert main_css.include?('--color-accent'), 'Missing indigo accent token'
assert main_css.include?('--color-warm'), 'Missing terracotta accent token'
assert main_css.include?('64rem'), 'Missing 1024px container'
assert main_css.include?('overflow-x:hidden'), 'Missing horizontal overflow guard'

puts 'Structural and content regression checks passed'
