require 'yaml'
require 'json'

root = File.expand_path('..', __dir__)
config = YAML.safe_load_file(File.join(root, '_config.yml'))
cname_path = File.join(root, 'CNAME')
authors = YAML.safe_load_file(File.join(root, '_data', 'authors.yml'))
cv = JSON.parse(File.read(File.join(root, '_data', 'cv.json')))
readme = File.read(File.join(root, 'README.md'))

abort 'Expected site URL to be https://xudongzhu.com' unless config['url'] == 'https://xudongzhu.com'
abort 'Expected author URL to use xudongzhu.com' unless config.dig('author', 'uri') == 'https://xudongzhu.com/'
unless File.file?(cname_path) && File.read(cname_path).strip == 'xudongzhu.com'
  abort 'Expected CNAME to contain xudongzhu.com'
end
abort 'Expected author data to use xudongzhu.com' unless authors.dig('Xudong Zhu', 'uri') == 'https://xudongzhu.com'
abort 'Expected CV data to use xudongzhu.com' unless cv.dig('basics', 'website') == 'https://xudongzhu.com'
abort 'README still references the old site URL' if readme.match?(%r{https://(?:xzAscC|xudongzhu)\.github\.io}i)

puts 'Domain configuration is valid'
