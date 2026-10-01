---
layout: archive
title: "Blog"
blog_search: true
permalink: /blog/
---

{% include base_path %}

<div class="blog-search" data-blog-search hidden>
  <label for="blog-query">Search the blog</label>
  <div class="blog-search__controls">
    <input id="blog-query" type="search" placeholder="Search titles, text, or tags…" autocomplete="off">
    <button type="button" data-search-reset>Clear</button>
  </div>
  <div class="blog-search__tags" aria-label="Filter by tag">
    <a class="post-tag" href="{{ '/blog/' | relative_url }}" data-tag="">All posts</a>
    {% assign sorted_tags = site.tags | sort %}
    {% for tag in sorted_tags %}<a class="post-tag" href="{{ '/blog/' | relative_url }}?tag={{ tag[0] | uri_escape }}" data-tag="{{ tag[0] | escape }}">{{ tag[0] }}</a>{% endfor %}
  </div>
  <p class="blog-search__status" role="status" aria-live="polite"></p>
</div>
<p class="empty-state" data-search-empty hidden>No posts match your search. Try another term or clear the filters.</p>

{% if site.posts.size > 0 %}
  <div class="post-archive">
    {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
    {% for year in posts_by_year %}
      <section class="post-archive__year" aria-labelledby="blog-year-{{ year.name }}">
        <h2 id="blog-year-{{ year.name }}" class="post-archive__year-label">{{ year.name }}</h2>
        <div class="post-list">
          {% for post in year.items %}
            {% include post-list-item.html post=post searchable=true %}
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  </div>
{% else %}
  <div class="empty-state">
    <p class="section-label">Coming soon</p>
    <p>The first notes are being drafted. In the meantime, the <a href="{{ base_path }}/publications/">publications</a> say most of what I have been thinking about.</p>
  </div>
{% endif %}

<p class="archive__feed"><a href="{{ base_path }}/feed.xml">Subscribe via RSS</a></p>
