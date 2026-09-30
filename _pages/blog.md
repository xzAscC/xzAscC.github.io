---
layout: archive
title: "Blog"
permalink: /blog/
---

{% include base_path %}

{% if site.posts.size > 0 %}
  <div class="post-archive">
    {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
    {% for year in posts_by_year %}
      <section class="post-archive__year" aria-labelledby="blog-year-{{ year.name }}">
        <h2 id="blog-year-{{ year.name }}" class="post-archive__year-label">{{ year.name }}</h2>
        <div class="post-list">
          {% for post in year.items %}
            {% include post-list-item.html post=post %}
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
