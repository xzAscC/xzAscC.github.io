require 'cgi'
SITE = File.expand_path('../_site', __dir__)
def assert(condition, message)
  abort message unless condition
end
page = CGI.unescapeHTML(File.read(File.join(SITE, 'projects/prefix-steering/index.html')))
listing = CGI.unescapeHTML(File.read(File.join(SITE, 'publications/index.html')))
home = CGI.unescapeHTML(File.read(File.join(SITE, 'index.html')))
title = 'One Token Can Be Enough: Bridging Prompting and Activation Steering with Prefix Steering'
assert page.include?(title) && listing.include?(title), 'Paper must be present in project and publications pages'
assert listing.include?('/projects/prefix-steering/'), 'Publication must link the project page'
assert page.include?('href="https://zhihuizhu.github.io/">Zhihui Zhu</a>'), 'Zhihui Zhu must link to his homepage'
assert page.include?('Zhihui Zhu') && page.include?('Xudong Zhu'), 'Project must credit both authors'
assert page.include?('fixed-state') && page.include?('often'), 'Project must preserve the scope of the paper claims'
assert !page.include?('2601.00000') && !page.include?('your-project'), 'Project must not retain template placeholders'
assert !page.include?('arxiv.org/abs/'), 'Do not invent an arXiv identifier before publication'
assert page.include?('noindex, nofollow'), 'Local preview must stay unindexed'
assert page.include?('data-theme-toggle'), 'Keep the template theme switch'
assert !page.include?('id="citation"') && !page.include?('href="#citation"'), 'Leave citation empty until the arXiv submission'
page.scan(/(?:href|src)="(\/[^"]+)"/).flatten.each do |url|
  path = url.split('#').first
  path += 'index.html' if path.end_with?('/')
  assert File.file?(File.join(SITE, path)), "Missing local project resource: #{url}"
end
nav = page[%r{<nav class="project-nav".*?</nav>}m]
nav.scan(/href="#([\w-]+)"/).flatten.each do |id|
  assert page.include?(%(id="#{id}")), "Missing navigation target: #{id}"
end
working = home[%r{<section class="showcase-section showcase-section--preprints".*?</section>}m]
assert working && working.include?(title), 'Unpublished manuscript belongs in working papers'
assert !home[%r{<section class="showcase-section showcase-section--publications".*?</section>}m].include?(title), 'Manuscript must not be labeled peer reviewed'

assert !page.include?('class="project-eyebrow"'), 'Prefix page should omit the template status label'
authors = page[%r{<ul class="project-authors".*?</ul>}m]
affiliations = page[%r{<ul class="project-affiliations".*?</ul>}m]
assert !authors.include?('<sup>') && !affiliations.include?('<sup>'), 'A shared affiliation needs no numeric markers'
assert page.include?('more favorable control–capability Pareto frontier'), 'Teaser should explain the observed Pareto trade-off'

body = page[%r{<div class="project-body".*?<section id="paper"}m]
assert body.scan('class="paper-figure"').length == 4, 'Show duration, matching, DiM, and model/task figures'
assert body.index('prefix-duration-strength.svg') < body.index('prefix-attention-matching.svg'), 'Start with duration and strength'
assert body.index('prefix-attention-matching.svg') < body.index('prefix-models-tasks.svg'), 'Put matching before cross-model results'
assert !body.include?('project-steps') && !body.include?('project-facts'), 'Remove the long method walkthrough and statistics cards'
assert body.include?('linear error bound'), 'Describe a linear upper bound, not guaranteed linear growth'
footer = page[%r{<footer class="project-footer".*?</footer>}m]
assert footer.include?('Xudong Zhu') && !footer.include?('Zhihui Zhu'), 'Page footer must credit its creator only'
puts 'Prefix project checks passed.'
