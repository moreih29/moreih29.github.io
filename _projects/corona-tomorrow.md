---
layout: project
title: '코로나 내일'
comments: true
caption: 국내 코로나 예측 및 현황 정보 제공 시스템
description: >
  2019년 처음 발생한 이후로 현재까지 코로나는 사회적으로 큰 문제를 야기하고 있습니다. 
  정부 및 많은 기관에서 통계 정보를 제공하고 있지만, 오늘 얻을 수 있는 정보는 어제의 통계 정보입니다.
  "코로나내일"은 코로나 예측 정보를 제공하여 사람들에게 미래를 대비하고 행동할 수 있는 기회를 제공합니다.
date: '01-07-2021'
image: 
  path: /assets/img/projects/corona-tomorrow/thumbnail.png
  srcset: 
    1920w: /assets/img/projects/corona-tomorrow/thumbnail.png
    960w:  /assets/img/projects/corona-tomorrow/thumbnail.png
    480w:  /assets/img/projects/corona-tomorrow/thumbnail.png
links:
  - title: Link
    url: https://coronatomorrow.co.kr/
sitemap: false
---

# 코로나 내일

* toc
{:toc}

## 진행 기간
- 2021.07 ~ 2022.05

## 1. Motivation
- 내일, 일주일 후와 같이 앞으로 발생할 코로나 확진자 수를 예측할 수 있다면 예방에 도움을 줄 수 있지 않을까?
- 하루 마다 갱신되는 코로나 관련 정보를 한 눈에 볼 수 있으면 편하지 않을까?

## 2. 데이터 수집
- 공공 데이터 포털과 질병관리청으로부터 매일 자동으로 데이터 수집

## 3. 코로나 예측 모델 설계
- 이전에 발생한 코로나 확진자를 입력으로 사용해 14일 후 까지의 확진자를 예측하고자 함
- 시계열 예측 문제를 풀기 위해 Seq2Seq과 Attention을 사용

## 4. 웹 페이지 구축
![웹서버구조](/assets/img/projects/corona-tomorrow/architecture.png){: width="80%"}
*웹 서버 구조*

- 공공데이터 포털과 질병관리청으로부터 매일 자동으로 데이터 수집
- 수집된 데이터는 데이터베이스에 저장
- Seq2Seq, Attention 기반 예측 모델을 활용해 향후 14일 동안의 코로나 발생을 예측

![코로나예측](/assets/img/projects/corona-tomorrow/prediction-chart.png){: width="50%"}
*예측 그래프*

- 예측된 결과와 기타 정보를 사용자에게 제공
  - 전국의 일간 확진자, 사망자, 예방접종 정보를 제공

  ![전국정보](/assets/img/projects/corona-tomorrow/nation-info.png){: width="50%"}
  *전국 정보*
  - 지역별 일간 확진자, 격리해제, 사망자, 거리두기 단계 정보를 제공

  ![지역정보](/assets/img/projects/corona-tomorrow/region-info.png){: width="50%"}
  *지역 정보*
