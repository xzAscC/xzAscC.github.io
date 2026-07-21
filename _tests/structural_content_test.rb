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
  blog/index.html
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
publications_page = CGI.unescapeHTML(File.read(site_file('publications/index.html')))
cv_page = CGI.unescapeHTML(File.read(site_file('cv-json/index.html')))
blog_page = CGI.unescapeHTML(File.read(site_file('blog/index.html')))
main_css = File.read(site_file('assets/css/main.css'))

[
  'PhD student in Computer Science at',
  'The Ohio State University',
  'Zhihui Zhu',
  'zhu.3944@osu.edu',
  'U55yracAAAAJ',
  'github.com/xzAscC'
].each do |content|
  assert homepage.include?(content), "Homepage lost required content: #{content}"
end

['Ohio State', 'University of Electronic Science'].each do |content|
  assert cv_page.include?(content.tr('\\', '')), "CV lost required content: #{content}"
end

cv_section_ids = %w[cv-experience-title cv-honors-title cv-open-source-title cv-publications-title]
cv_section_positions = cv_section_ids.map { |id| cv_page.index(%(id="#{id}")) }
assert cv_section_positions.all?, 'CV must render Experience, Honors, Open Source, and Publications sections'
assert cv_section_positions == cv_section_positions.sort,
       'CV section order must be Experience, Honors, Open Source, then Publications'
['MMLS 2026 Traveling Award', 'NAIRR Pilot Project NAIRR260106',
 'Geometry and Training Dynamics of Representations in Large Language Models'].each do |content|
  assert cv_page.include?(content), "CV lost honor content: #{content}"
end
%w[LLMUsage dotfiles].each do |project|
  assert cv_page.include?(project), "CV lost open-source project: #{project}"
end
assert cv_page.scan(/class="cv-award-card"/).length == 2, 'CV must render exactly two honor cards'
assert cv_page.scan(/class="cv-publication-card"/).length == 4, 'CV must render exactly four publication cards'

assert blog_page.include?('<h1 id="archive-title" class="page__title">Blog</h1>'),
       'Blog route must render its page title'
assert !blog_page.include?('<article'), 'Blog must remain empty until content is added'

desktop_nav = homepage[%r{<div class="site-nav__links">.*?</div>}m]
assert desktop_nav, 'Primary desktop navigation is missing'
nav_positions = ['/publications/', '/cv-json/'].map { |path| desktop_nav.index(path) }
assert nav_positions.all?, 'Primary navigation must include Publications and CV'
assert nav_positions == nav_positions.sort, 'Primary navigation must keep Publications before CV'
assert !homepage.match?(%r{href="[^"]*/blog/"}),
       'Blog must stay hidden from navigation until content is published'

publication_pages = Dir.glob(site_file('publications/*/index.html'))
assert publication_pages.length == 4, "Expected 4 publication detail pages, found #{publication_pages.length}"
publication_html = publication_pages.map { |path| CGI.unescapeHTML(File.read(path)) }

paper_titles = [
  'AbsTopK: Rethinking Sparse Autoencoders For Bidirectional Features',
  'Alleviating subgraph-induced oversmoothing in link prediction via coarse graining',
  'From Emergence to Control: Probing and Modulating Self-Reflection in Language Models',
  'FCDS: Fusing Constituency and Dependency Syntax into Document-Level Relation Extraction'
]
project_names = %w[LLMUsage dotfiles]

(paper_titles + project_names).each do |title|
  assert homepage.include?(title), "Homepage showcase lost card: #{title}"
end

legacy_homepage_headings = ['Research Interests', 'Recent Work', 'Awards & Service', 'Background']
legacy_homepage_headings.each do |heading|
  assert !homepage.match?(%r{<h2[^>]*>\s*#{Regexp.escape(heading)}\s*</h2>}),
         "Homepage still renders removed section: #{heading}"
end

assert homepage.scan(/<article class="home-publication-card"/).length == 4,
       'Homepage must render exactly four research cards'
assert homepage.scan(/<article class="project-card"/).length == 2,
       'Homepage must render exactly two project cards'

cover_paths = %w[
  /assets/images/publications/abstopk.png
  /assets/images/publications/coarse-graining.svg
  /assets/images/publications/self-reflection.png
  /assets/images/publications/fcds.png
]
cover_paths.each do |cover_path|
  assert homepage.match?(/<img\b[^>]*src="[^"]*#{Regexp.escape(cover_path)}"[^>]*alt="Cover of [^"]+"/),
         "Homepage must render a useful cover image for: #{cover_path}"
  assert File.file?(site_file(cover_path.delete_prefix('/'))), "Missing generated cover asset: #{cover_path}"
end

publications_section = homepage[%r{<section class="showcase-section showcase-section--publications".*?</section>}m]
preprints_section = homepage[%r{<section class="showcase-section showcase-section--preprints".*?</section>}m]
projects_section = homepage[%r{<section class="showcase-section showcase-section--projects".*?</section>}m]
assert publications_section, 'Homepage must include a Publications section'
assert preprints_section, 'Homepage must include a Preprints section'
assert projects_section, 'Homepage must include a Building in Public section'
showcase_positions = %w[publications preprints projects].map do |section|
  homepage.index(%(showcase-section--#{section}))
end
assert showcase_positions == showcase_positions.sort,
       'Homepage showcase order must be Publications, Preprints, then Building in Public'
assert preprints_section.include?(paper_titles[2]), 'Self-Reflection must be classified as a preprint'
assert !publications_section.include?(paper_titles[2]), 'Self-Reflection must not be classified as a publication'
[paper_titles[0], paper_titles[1], paper_titles[3]].each do |title|
  assert publications_section.include?(title), "Publications section lost paper: #{title}"
  assert !preprints_section.include?(title), "Preprints section incorrectly includes: #{title}"
end
publication_positions = [paper_titles[0], paper_titles[1], paper_titles[3]].map do |title|
  publications_section.index(title)
end
assert publication_positions == publication_positions.sort, 'Homepage publications must remain newest first'

assert publications_page.scan(/<article class="publication-card"/).length == 4,
       'Dedicated publications page must retain exactly four shared publication cards'
assert publications_page.include?('class="archive publications-archive"'),
       'Publications listing must expose a scoped typography hook'
conference_position = publications_page.index('publications-conferences')
journal_position = publications_page.index('publications-manuscripts')
assert conference_position && journal_position && conference_position < journal_position,
       'Conference Papers must appear before Journal Articles'
assert publications_page.scan(/class="publication-card__excerpt"/).length == 4,
       'Every publication card must use the readable excerpt style'
paper_titles.each do |title|
  assert publications_page.include?(title), "Dedicated publications page lost paper: #{title}"
end
assert !publications_page.include?('home-publication-card'),
       'Dedicated publications page must not use homepage-only research cards'
assert publication_html.all? { |html| html.include?('class="article page publication-detail"') },
       'Publication detail pages must expose a scoped title style hook'

Dir.glob(File.join(ROOT, '_publications', '*.md')).each do |source|
  title = File.read(source)[/^title:\s*["']?(.*?)["']?\s*$/, 1]
  detail_exists = title && publication_html.any? { |html| html.include?(title) }
  assert detail_exists, "Missing publication detail page for: #{title || source}"
end

nav_source = File.read(File.join(ROOT, '_includes', 'editorial-nav.html'))
scripts_source = File.read(File.join(ROOT, '_includes', 'scripts.html'))
archive_item_source = File.read(File.join(ROOT, '_includes', 'archive-single.html'))
citation_source = File.read(File.join(ROOT, '_includes', 'citation.html'))
dark_toggle_source = File.read(File.join(ROOT, 'assets', 'js', 'dark-toggle.js'))
plotly_source = File.read(File.join(ROOT, 'assets', 'js', 'plotly-render.js'))
config_source = File.read(File.join(ROOT, '_config.yml'))
assert !nav_source.include?('<script>'), 'Theme behavior must live in the shared dark-toggle module'
assert nav_source.include?('site-nav__menu'), 'Primary navigation must provide a mobile disclosure menu'
assert nav_source.scan('{% for link in site.data.navigation.main %}').length == 1,
       'Desktop and mobile navigation must share one generated link list'
assert scripts_source.scan('dark-toggle.js').length == 1, 'Dark toggle module must load exactly once'
assert !scripts_source.include?('main.min.js'), 'Editorial pages must not load the legacy theme bundle'
assert !archive_item_source.include?('class="fa'),
       'Active archive markup must not depend on removed Font Awesome assets'
assert !citation_source.include?('{% elsif'), 'Citation links must be composed without subset branches'
%w[page.paperurl page.slidesurl page.bibtexurl].each do |citation_link|
  assert citation_source.include?(citation_link), "Citation include lost optional link: #{citation_link}"
end
assert plotly_source.include?('catch (error)'), 'Invalid Plotly JSON must not stop later blocks from rendering'
assert dark_toggle_source.include?('addEventListener("change"'),
       'Unsaved themes must follow operating-system preference changes'
assert !dark_toggle_source.include?('const preferredTheme'),
       'Theme module must use the pre-paint theme instead of recomputing it'
assert !config_source.match?(/^\s+share:\s+true\s*$/), 'Removed share integration must not remain enabled'
assert !config_source.match?(/^\s+comments:\s+true\s*$/), 'Removed comments integration must not remain enabled'

active_layouts = %w[default.html single.html archive.html].map do |name|
  File.read(File.join(ROOT, '_layouts', name))
end.join("\n")
%w[sidebar.html page__hero.html breadcrumbs.html browser-upgrade.html].each do |legacy_include|
  assert !active_layouts.include?(legacy_include), "Active layouts still depend on legacy include: #{legacy_include}"
end

%w[
  _sass/vendor
  _sass/layout
  _sass/theme
  assets/js/main.min.js
  assets/js/_main.js
  assets/js/plugins
  assets/webfonts
  package.json
].each do |legacy_path|
  assert !File.exist?(File.join(ROOT, legacy_path)), "Dormant legacy path must be removed: #{legacy_path}"
end

single_layout = File.read(File.join(ROOT, '_layouts', 'single.html'))
about_source = File.read(File.join(ROOT, '_pages', 'about.md'))
about_front_matter, about_body = about_source.split(/^---\s*$\n?/, 3).last(2)
assert single_layout.include?('page.intro'), 'Homepage hero must read its introduction from page front matter'
assert about_front_matter.include?('intro:'), 'Homepage front matter must define its hero introduction'
assert about_front_matter.include?('interests:'), 'Homepage front matter must define research interest pills'
assert about_front_matter.include?('representation learning and training dynamics'),
       'Homepage introduction must prioritize representation learning and training dynamics'
assert about_front_matter.include?('advance mechanistic interpretability'),
       'Homepage introduction must connect its main directions to mechanistic interpretability'
assert about_body.strip == '{% include homepage-showcase.html %}',
       'Homepage body must only invoke the homepage showcase include'
assert !single_layout.include?('Researcher &amp; PhD student'), 'Homepage must not render the removed eyebrow'
assert single_layout.include?('images/profile-upscaled.png'), 'Homepage must use the high-resolution portrait'
assert !about_body.match?(/^## Contact\s*$/), 'Homepage body must not render a Contact section'
footer_source = File.read(File.join(ROOT, '_includes', 'editorial-footer.html'))
assert !footer_source.include?('Sitemap'), 'Footer must not render a Sitemap link'
typography_source = File.read(File.join(ROOT, '_sass', 'editorial', '_typography.scss'))
hero_lead_style = typography_source.scan(/\.site-hero__lead\s*\{.*?\}/m).join("\n")
assert hero_lead_style.include?('font-family: var(--font-body)'), 'Homepage introduction must use the body font'
assert hero_lead_style.include?('font-size: var(--text-lg)'), 'Homepage introduction must use a readable body size'
layout_source = File.read(File.join(ROOT, '_sass', 'editorial', '_layout.scss'))
portrait_style = layout_source.scan(/\.site-hero__portrait(?:\s+img)?\s*\{.*?\}/m).join("\n")
assert portrait_style.include?('width: 10rem'), 'Homepage portrait must not over-enlarge the low-resolution source'
assert portrait_style.include?('aspect-ratio: 1'), 'Homepage portrait must preserve the square source framing'
assert portrait_style.include?('object-fit: contain'), 'Homepage portrait must not crop the source image'
assert homepage.include?('href="https://www.osu.edu/">The Ohio State University</a>'),
       'Homepage institution must be linked'
assert homepage.include?('class="link--person">Zhihui Zhu</a>'), 'Homepage advisor must use the person link style'
social_links = homepage[%r{<nav class="social-links".*?</nav>}m]
assert social_links, 'Homepage must include the social link navigation'
expected_social_links = ['GitHub', 'Google Scholar', 'Email', 'X']
social_positions = expected_social_links.map { |label| social_links.index(%(aria-label="#{label}")) }
assert social_positions.all?, 'Homepage must include GitHub, Google Scholar, Email, and X links'
assert social_positions == social_positions.sort, 'Homepage social links must preserve the requested order'
assert social_links.scan(/<a\b/).length == 4, 'Homepage social navigation must contain exactly four links'
assert social_links.include?('/assets/images/google-scholar.svg'), 'Homepage must use the requested Google Scholar logo'
assert social_links.include?('href="https://x.com/XudongZhu3944"'), 'Homepage must use the configured X profile'
assert !social_links.match?(/ORCID|arXiv/), 'Homepage social navigation must not include ORCID or arXiv'
expected_interests = ['Representation Learning', 'Mechanistic Interpretability', 'Representation Geometry',
                      'Training Dynamics']
interest_positions = expected_interests.map { |interest| homepage.index(%(<li class="interest-pill">#{interest}</li>)) }
assert interest_positions.all?, 'Homepage must include every requested research interest pill'
assert interest_positions == interest_positions.sort,
       'Homepage research interest pills must preserve the requested order'
assert !about_body.match?(/^#\s+Xudong Zhu\s*$/), 'Homepage body must not repeat the hero heading'

assert homepage.include?('site-hero'), 'Missing editorial hero markup'
assert homepage.include?('interest-pill'), 'Missing research interest pills'
assert homepage.include?('theme-toggle'), 'Missing theme toggle'
assert main_css.include?('.homepage-showcase{') && main_css.include?('padding-bottom:var(--space-9)'),
       'Homepage showcase must leave breathing room above the footer'
assert main_css.include?('padding-bottom:var(--space-8)'),
       'Homepage showcase must preserve footer breathing room on mobile'
assert main_css.include?('Crimson Pro'), 'Missing Crimson Pro typography'
assert main_css.include?('Inter'), 'Missing Inter typography'
assert main_css.include?('--color-bg'), 'Missing background design token'
assert main_css.include?('--color-accent'), 'Missing indigo accent token'
assert main_css.include?('--color-warm'), 'Missing terracotta accent token'
assert main_css.include?('64rem'), 'Missing 1024px container'
assert main_css.include?('overflow-x:hidden'), 'Missing horizontal overflow guard'

puts 'Structural and content regression checks passed'
