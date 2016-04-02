"use strict";

function makeArray(args) {
  return Array.from(args);
}

class EventedElement {
  constructor(element) {
    this.element = element;
  }

  addClass(className) {
    return this.element.classList.add(className);
  }

  addEvent(event, handler) {
    return this.element.addEventListener(event, handler);
  }

  find(el) {
    return new EventedElement(this.element.querySelector(el));
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }
}

function easeInOutSine(duration, elapsed, start, end) {
  return Math.round(-end / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + start);
}

class AnchorScroll extends EventedElement {
  constructor(element) {
    super(element);
    this.container = new EventedElement(this.element.parentNode);
    this.siblings = makeArray(this.element.parentNode.parentNode.children).map(child => new EventedElement(child));
    this.addEvent("click", this.scroll.bind(this));
  }

  animateScroll(target, hash, rect, topMost) {
    const coordinates = this.getCoordinates(target);

    if (!coordinates) { return; }
    const duration = 1000;
    const progress = new Map([["duration", duration], ["elapsed", 0]]);
    const start = performance.now();

    function tick(timestamp) {
      progress.set("elapsed", timestamp - start);
      document.body.scrollTop = easeInOutSine(...progress.values(), ...coordinates.values());

      if (progress.get("elapsed") < progress.get("duration")) {
        return requestAnimationFrame(tick.bind(this));
      }

      this.complete(hash, coordinates);
    }

    requestAnimationFrame(tick.bind(this));
  }

  complete(hash, coordinates) {
    history.pushState(null, null, hash);
    document.body.scrollTop = coordinates.get("start") + coordinates.get("delta");
  }

  getCoordinates(element) {
    const start = document.body.scrollTop;
    const top = element.getBoundingClientRect().top;
    const max = document.body.scrollHeight - window.innerHeight;
    const delta = start + top < max ? top : max - start;

    if (delta) { return new Map([["start", start], ["delta", delta]]); }
  }

  scroll(e) {
    e.preventDefault();
    const hash = this.element.hash;
    const target = document.querySelector(hash);

    this.siblings.forEach(sibling => sibling.removeClass("active"));
    this.container.addClass("active");

    this.animateScroll(target, hash);
  }
}

class Waypoint extends EventedElement {
  constructor(element, options) {
    super(element);
    this.animations = [];

    options.animations.forEach(animation => {
      this.animations.push({
        element: new EventedElement(document.querySelector(animation.element)),
        class: animation.class
      });
    });
  }

  runAnimations() {
    if (this.animations.length) {
      this.animations.forEach(animation => {
        animation.element.addClass(animation.class);
      });
    }
  }

  check() {
    const target = this.element.getBoundingClientRect().top;

    if (target <= 50) {
      this.runAnimations();
    }
  }
}

const anchors = makeArray(document.querySelectorAll("a[data-scroll]"));
const hash = window.location.hash;

anchors.map(anchor => new AnchorScroll(anchor));

// add active link on refresh if hash is present
if (hash) {
  const activeLink = anchors.filter(anchor => anchor.hash === hash)[0].parentNode;

  activeLink.classList.add("active");
}

function setSectionHighlight() {
  const currentPos = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.body.clientHeight;


  for (let i = 0; i < anchors.length; i++) {
    const id = anchors[i].hash;
    const section = document.getElementById(id.replace(/#/, "")).parentNode;
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;

    if (sectionTop <= 0 && Math.abs(sectionTop) < sectionHeight) {
      anchors[i].parentNode.classList.add("active");
    } else {
      anchors[i].parentNode.classList.remove("active");
    }
  }

  if (currentPos + windowHeight >= docHeight) {
    // add active to last anchor
    const lastAnchor = anchors[anchors.length - 1];
    if (!lastAnchor.parentNode.classList.contains("active")) {
      anchors.forEach(anchor => anchor.parentNode.classList.remove("active"));
      lastAnchor.parentNode.classList.add("active");
    }
  }
}

const about = document.getElementById("about");
const projects = document.getElementById("projects");
const aboutWayPoint = new Waypoint(about, {
  animations: [
    { element: ".profile-image", class: "show" },
    { element: ".section_about__content", class: "show" },
    { element: ".quote", class: "show" }
  ]
});
const projectsWaypoint = new Waypoint(projects, {
  animations: [
    { element: "#AniFit", class: "show" },
    { element: "#Bonfire", class: "show" },
    { element: "#Hotcakes", class: "show" },
    { element: "#Twitter", class: "show" },
    { element: "#Google", class: "show" },
    { element: "#Apple", class: "show" },
    { element: "#TopSecret", class: "show" }
  ]
});

window.onscroll = e => {
  setSectionHighlight();
  aboutWayPoint.check();
  projectsWaypoint.check();
};

let map

function loadMap() {
  const mapContainer = document.querySelector(".map");

  map = new google.maps.Map(mapContainer, {
    center: { lat: 37.338208, lng: -121.886329 },
    scrollwheel: false,
    zoom: 15
  });

}

window.loadMap = loadMap;

if ("ontouchstart" in document.documentElement) {
  document.documentElement.className += "touch";
}

function trackClick(element) {
  const tracks = element.getAttribute("data-track").split(";");
  const props = {};

  tracks.forEach(track => {
    const parts = track.split(":");

    props[parts[0]] = parts[1];
  });

  element.addEventListener("click", e => {
    ga("send", "event", props.type, "click", props.label);
  });
}

const elementsToTrack = makeArray(document.querySelectorAll("a[data-track]"));

elementsToTrack.forEach(trackClick);
