require 'cgi'

# Checks the project page template in the built site (see _tests/run.sh).
SITE = File.expand_path('../_site', __dir__)

def assert(condition, message)
  abort message unless condition
end

def read(path)
  File.read(File.join(SITE, path))
end

page = CGI.unescapeHTML(read('blog/2026/research-templates/project/index.html'))
css = read('assets/css/project.css')
teaser = read('assets/images/project-template-overview.svg')

# Authors: shared affiliations, equal contribution, and corresponding author marks
assert page.include?('<sup>1,2</sup>'), 'Authors must support several affiliations'
assert page.match?(%r{<sup>1</sup>\s*University One}), 'Affiliations must be numbered from a list'
assert page.include?('class="project-author-mark">*'), 'Equal contribution must be marked'
assert page.include?('class="project-author-mark">†'), 'Corresponding authors must be marked'
assert page.include?('* Equal contribution') && page.include?('† Corresponding author'),
       'Author marks must be explained'

# Navigation is generated, so it only links to sections that exist
nav = page[%r{<nav class="project-nav".*?</nav>}m]
nav.scan(/href="#([\w-]+)"/).flatten.each do |id|
  assert page.include?(%(id="#{id}")), "Navigation links to a missing section: ##{id}"
end
%w[overview method results paper citation].each do |id|
  assert nav.include?(%(href="##{id}")), "Navigation must list ##{id}"
end
assert !page.match?(%r{<span>0\d</span>\s*<h2>}), 'Section numbers must come from CSS counters'
assert css.include?('counter-increment'), 'Section numbers must be generated'

# Social previews
%w[og:title og:description og:type twitter:card].each do |name|
  assert page.include?(%(property="#{name}")) || page.include?(%(name="#{name}")), "Missing #{name} meta tag"
end
assert page.include?('rel="icon"'), 'Project page must declare a favicon'

# Resources: arXiv link, and arrows only on external links
assert page.include?('href="https://arxiv.org/abs/'), 'Resources must include an arXiv link'
assert page.match?(%r{href="/files/arxiv-template-example\.pdf">Paper</a>}), 'Local links must not show an external arrow'
assert page.match?(%r{github\.com/[^"]+"[^>]*>Code <span aria-hidden="true">↗</span>}), 'External links must show an arrow'

# Results: a figure and a table with the best value and uncertainty
assert page.include?('class="project-table"'), 'Results must show a table example'
assert page.include?('<strong>') && page.include?('±'), 'Result table must highlight the best value and show uncertainty'

# Optional sections render only when configured; the demo has no video
layout = File.read(File.expand_path('../_layouts/project.html', __dir__))
assert layout.include?('youtube-nocookie.com/embed/'), 'Video must embed without tracking cookies'
assert !page.include?('id="video"'), 'Video section must stay hidden without a video'

# PDF reader falls back to a preview where browsers cannot show PDFs inline
assert page.include?('class="pdf-viewer__fallback"'), 'PDF reader needs a fallback for mobile browsers'
assert page.include?('pdfViewerEnabled'), 'PDF fallback must detect inline PDF support'
assert File.file?(File.join(SITE, 'assets/images/arxiv-template-preview.svg')), 'Missing PDF preview image'
assert css.include?('.no-pdf-viewer'), 'PDF fallback must be styled'

# Citation uses the arXiv BibTeX format
assert page.include?('archivePrefix') && page.include?('eprint'), 'BibTeX must use the arXiv format'

# Theming: one accent setting, dark mode, and a teaser that follows it
assert page.match?(/<body[^>]*style="--project-accent: #[0-9a-f]{6}"/i), 'Accent color must come from front matter'
assert css.include?('prefers-color-scheme: dark'), 'Project page must support dark mode'
assert teaser.include?('prefers-color-scheme: dark'), 'Teaser must support dark mode'

# Readers can switch themes; the choice is shared with the rest of the site
assert page.match?(/<button[^>]*data-theme-toggle/), 'Project page needs a theme toggle'
assert page.match?(%r{<head>.*localStorage\.getItem\('theme'\).*</head>}m), 'Saved theme must apply before the page paints'
assert css.include?("html[data-theme=dark] .project-page") || css.include?("html[data-theme='dark'] .project-page"),
       'Dark accent must follow the chosen theme'
assert page.match?(/<img[^>]*width="1200" height="410"/), 'Teaser size must be set to prevent layout shift'

puts 'Project template checks passed.'
