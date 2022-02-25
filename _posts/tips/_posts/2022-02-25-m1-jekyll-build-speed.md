---
layout: post
title: M1 mac에서 jekyll build 속도
comments: true
categories: [tips]
tags: [m1, jekyll]
description: >
  M1 mac에서 docker사용 했을 때와 native에서 build 속도를 비교합니다.
sitemap: false
hide_last_modified: true
---

단순한 개발이나 영상 감상 등 다양한 목적으로 m1 맥 프로를 구매했습니다.

하지만 아직 m1의 arm기반으로 개발을 하려다보면 문제가 종종 생기기 때문에 docker를 사용한 개발 환경을 만들어서 사용하려고 생각했습니다. 

그래서 github blog를 만들때도 jekyll의 docker 이미지를 받아서 컨테이너를 올리고 그 안에서 빌드를 했었는데 문서 한 번 바꾸고 확인할 때마다 너무 느린것 같아서 속도를 보니 약 23초가 소요되고 있었습니다. 

너무 느린 것 같아서 docker 없이 ruby, bundle, jekyll을 설치해서 실행하보니 약 1.5초가 걸렸습니다.

정말 충돌이 나거나 실행이 안되는 경우가 아니면 웬만한 경우에는 m1 native로 실행해야 할 것 같습니다. 

엄청난 차이네요.

| M1 native | Docker container |
|:---------:|:----------------:|
|![](/assets/img/daily/m1-jekyll-build.png) |![](/assets/img/daily/docker-jekyll-build.png)|