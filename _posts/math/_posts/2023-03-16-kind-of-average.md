---
layout: post
title: 평균의 종류
comments: true
categories: [research]
tags: [math]
description: >
  산술 평균, 기하 평균, 조화 평균의 개념을 이해한다.
hide_last_modified: true
# hide_image: true
image: 
  path: /assets/img/research/math/average-cover.png
  srcset: 
    1920w: /assets/img/research/math/average-cover.png
    960w: /assets/img/research/math/average-cover.png
    480w: /assets/img/research/math/average-cover.png
---

# 평균의 종류

평균은 너무나 많은 곳에서 사용되기 때문에, 기본 개념에 대해 확실히 잡고 넘어가기 위해 정리
{: .first} 

* toc
{:toc}

## 산술 평균
---
- 일반적으로 접하는 평균 값이 산술 평균
- 두 과목 시험 점수의 평균, 월 별 평균 소비 금액 등 다양하게 사용
- a와 b의 산술평균은 다음과 같이 나타낼 수 있음
  - $$산술평균 = {a + b \over 2}$$


## 기하 평균
---
- 시간에 따라 비율적으로 변화하는 값의 평균을 알기 위해 사용
- 예를 들어 10만원을 주식에 투자한 경우,
  - 1년 후, 원금을 포함해 20만원이 되어 시작 금액의 2배
  - 또 1년 후, 원금을 포함해 80만원이 되어 시작 금액의 4배
- 산술평균을 적용하면 2년 동안의 평균 수익률은 $${2 + 4 \over 2} = 3$$
- 2년 동안 매 년 3배로 금액이 증가했다고 생각하면, 1년 후, 30만원, 2년 후 90만원으로 맞지 않음
- 기하평균은 n개의 값의 곱을 n제곱근으로 나누는 것이며 a와 b의 기하평균은 다음과 같이 나타낼 수 있음
  - $$기하평균 = \sqrt{ab}$$
- 이것을 위 예제에 적용하면 수익률의 기하평균은 $$\sqrt{2 \times 4} = \sqrt{8}$$
- 적용하면, 1년 후 $$10\sqrt{8}$$만원, 2년 후 $$10\sqrt{8}\times\sqrt{8} = 10 \times 8 = 80$$만원
- 비율의 평균을 구할 때 사용

## 조화 평균
---
- 시간에 따라 변화하는 값의 평균을 알기 위해 사용
- 역수들의 산술평균을 구하고, 다시 역수로 나타낸 것
- a와 b의 조화평균은 다음과 같이 나타낼 수 있음
  - $$조화평균 = {1 \over { {1 \over a} + {1 \over b} \over 2}} = {2 \over { {a + b} \over ab}} = { {2ab} \over {a+b}}$$
- 속력의 평균을 구할 때 사용
  - 예를 들어, "A와 B사이의 거리 $$l$$을 A에서 B로 이동할 때 시속 80km, B에서 A로 이동할 때 120km로 이동하여 왕복에 2시간이 소요되었다면, 평균 속력은 얼마인가?" 라는 질문에 대해,
  - $${ {80+120} \over 2} = 100$$ 산술평균을 통해 얻어진 100km/h는 정답이 아님
  - $$거리=속도 \times 시간$$이므로
  - 평균 속력 $$v = { {2l} \over t_a + t_b}$$ ($$t_a$$와 $$t_b$$는 각각 A>B, B>A로 이동한 시간)
  - $$t_a = {l \over {v_a}}$$, $$t_b = {l \over {v_b}}$$ 이므로,
  - $$v = { {2l} \over t_a + t_b} = { {2l} \over { {l \over v_a} + {l \over v_b}}} = { {2v_av_b} \over {v_a + v_b}}$$
    - 조화평균 수식과 같음

## 세 평균의 기하학적 표현
---
![](/assets/img/research/math/average-geometrical.png)
{: .lead}

각 평균의 기하학적 의미
{: .figcaption}

## References
---
- https://blog.naver.com/PostView.naver?blogId=yskim004&logNo=222321099131
- https://2stndard.tistory.com/138