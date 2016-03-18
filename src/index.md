---
name: index
layout: page.html
---

<section class="section section_hero">
  <div class="hero">
    <div class="tagline">
      <h1 class="heading heading_main">
        My name is Dylan and I build cool things
      </h1>
    </div>
  </div>
</section>

<section class="section section_about">
  <h2 id="about" class="heading heading_sub">Me</h2>
  <div class="section__content">
    <div class="profile-image">
    </div>
    <div class="section_about__content">
      <p>
        For over 3 years I have had the privilege of working on some incredible
        projects with some of the most talented people. From design to delivery,
        I work closely with you to ensure complete satisfaction. Put simply,
        I love to build cool stuff.
      </p>
    </div>
    <p class="quote">
      A man may die, nations may rise and fall, but an idea lives on. - JFK
    </p>
  </div>
</section>

<section class="section section_projects">
  <h2 id="projects" class="heading heading_sub">My stuffs</h2>
  <div class="section__content section_projects__content">
    <div class="projects-list">
      {{#each projects as |project|}}
      <a href="{{project.site}}" target="_blank" class="link link_primary">
        <div class="projects-list__item" style="background-image: url('{{project.image}}');">
          <div class="projects-list__item__description">
            <p>{{project.description}}</p>
          </div>
        </div>
      </a>
      {{/each}}
    </div>
  </div>
</section>

<section class="section section_contact">
  <h2 class="heading heading_sub" id="contact">Beep</h2>
</section>
