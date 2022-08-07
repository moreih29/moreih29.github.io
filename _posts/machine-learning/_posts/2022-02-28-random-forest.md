---
layout: post
title: 랜덤 포레스트(Random Forest)
comments: true
categories: [research]
tags: [machine-learning]
description: >
  나무를 모아 숲을 만든 랜덤 포레스트를 살펴봅니다.
hide_last_modified: true
image: 
  path: https://www.datatrained.com/post/wp-content/uploads/2022/03/Decision-Tree-vs-Random-Forest-3-1140x570.jpg
  srcset: 
    1920w: https://www.datatrained.com/post/wp-content/uploads/2022/03/Decision-Tree-vs-Random-Forest-3-1140x570.jpg
    960w: https://www.datatrained.com/post/wp-content/uploads/2022/03/Decision-Tree-vs-Random-Forest-3-1140x570.jpg
    480w: https://www.datatrained.com/post/wp-content/uploads/2022/03/Decision-Tree-vs-Random-Forest-3-1140x570.jpg
---

# 랜덤 포레스트(Random Forest)

결정 트리는 직관적이고 다양한 분류, 회귀 문제에 적용될 수 있는 방법이었지만, 훈련데이터에 과적합 되는 경향이 있습니다.
랜덤 포레스트는 그렇게 과적합 된 나무(결정 트리)들을 모아서 숲을 만들어 문제를 해결합니다.
{: .first}

* toc
{: toc}

## 개요
![](https://camo.githubusercontent.com/cd58e98243f5e1c356b74cdca22a278bd72e6b968a182da7e7110175e78ce16d/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f332f33362f2545422539452539432545422538442541342545442538462541432545422541302538382545432538412541342545442538412542385f2545442539352539392545432538412542352545412542332542432545432541302539355f2545422542302542302545412542392538352e706e672f3132383070782d2545422539452539432545422538442541342545442538462541432545422541302538382545432538412541342545442538412542385f2545442539352539392545432538412542352545412542332542432545432541302539355f2545422542302542302545412542392538352e706e67){: .lead .wb}

결정 트리는 주어진 데이터에서 문제를 더 잘 해결하기 위해, 더 많은 조건을 줄 수 있습니다. 
그 경우, 주어진 데이터의 문제는 완벽히 해결할 수 있지만, 새로운 데이터가 들어왔을 때에는 
문제를 해결하지 못할 수 있습니다. 
이렇게 특정 데이터 셋에 너무 최적화되어 새로운 데이터 셋에 적용하지 못하는 경우를
과적합(overfitting)이라고 합니다.

결정 트리의 과적합 문제를 막기 위해서, 랜덤 포레스트는 전체 데이터 중
랜덤으로 선택된 일부 데이터에 과적합된 결정 트리를 많이 만들고, 
만들어진 결정 트리의 결과를 평균냄으로써 과적합을 해결하고 성능을 향상시킵니다.

## 동작 과정

### Step 1

각 결정 트리는 전체 데이터의 부분 데이터 셋에 대해 과적합이 되어야 합니다.
이를 위해서 부트스트랩 샘플(bootstrap sample)을 생성합니다. 
**부트스트랩 샘플은 n개의 데이터 속에서 n번의 중복 추출하여 샘플링 하는 것을 말합니다.**
즉, 부분 데이터 셋은 전체 데이터 셋과 크기는 같지만, 일부 데이터는 누락되거나 중복될 수 있습니다. 
예를 들어, 리스트 `['a', 'b', 'c', 'd']`에서 부트스트랩 샘플을 만들면, `['b', 'd', 'd', 'c']` 또는 `['d', 'a', 'd', 'a']`와 같은 형태가 될 수 있습니다.

### Step 2

랜덤 포레스트의 경우, 동일한 데이터 셋에서 다양한 형태의 결정 트리를 만드는 것이 목표입니다.
그것을 위해 부트스트랩 샘플링을 통해 데이터 셋을 다양하게 나눴는데요. 
데이터 셋 뿐만 아니라, 모델 자체에서도 다양성을 유지하기 위해 학습 과정에서도 랜덤성을 부여합니다.
각 노드는 모든 특성을 대상으로 최선의 분기를 찾는 것이 아닌, 랜덤으로 선택된 m개의 특성에 대해서만
최선의 분기를 찾습니다.
또한, 매 노드마다 m개의 특성은 바뀌게 되고 이를 통해 다양한 결정 트리를 얻을 수 있습니다.

### Step 3

랜덤하게 선택된 데이터, 랜덤하게 선택된 각 노드의 특성을 사용해 다양한 형태의 결정 트리가 생성됩니다.
랜덤 포레스트는 모든 결정 트리들이 예측한 값들의 평균을 내어 최종 결과를 출력합니다.

## 앙상블(Ensemble)
---

랜덤 포레스트와 같이 여러 개의 모델을 연결하여 더 강력한 모델을 생성하는 방법을 앙상블(ensemble)
이라고 합니다. 
대표적인 앙상블 전략으로는 *보팅(Voting)*, *배깅(Bagging)*, *부스팅(Boosting)*이 있습니다.

### 보팅(Voting)
여러 개의 모델이 투표를 통해 최종 예측 결과를 결정하는 방식입니다. 
다수의 분류기가 예측한 결과를 최종 값으로 선택하는 하드 보팅 방식과,
모든 분류기가 예측한 확률 평균을 구한 뒤 가장 높은 확률을 갖는 값을 선택하는 소프트 보팅 방식이 있습니다.

### 배깅(Bagging)

배깅은 Bootstrap aggregating을 의미하며, 부트스트랩 방법의 샘플링을 통해 모델을 학습 시키고
결과를 통합하는 것을 의미합니다. 
랜덤 포레스트의 경우 배깅을 사용하는 대표적인 모델입니다.

### 부스팅(Boosting)

부스팅 방식은 모델이 잘못 예측한 데이터에 집중하여 학습시키는 전략을 취합니다.
여러 개의 분류기들을 순차적으로 학습시키면서, 이전 모델이 잘못 예측한 데이터에 가중치를 부여합니다.
가중치가 높은 데이터는 샘플링 과정에서 더 많이 추출되므로, 모델의 부족한 부분을 채울 수 있습니다.
일반적으로 배깅보다 높은 정확도를 갖지만, 과적합에 취약한 문제를 갖고 있습니다.

## 예제 코드

---

[https://github.com/moreih29/randomforest-tutorial](https://github.com/moreih29/randomforest-tutorial)

---

## References

- [https://tensorflow.blog/파이썬-머신러닝/2-3-6-결정-트리의-앙상블/](https://tensorflow.blog/%ed%8c%8c%ec%9d%b4%ec%8d%ac-%eb%a8%b8%ec%8b%a0%eb%9f%ac%eb%8b%9d/2-3-6-%ea%b2%b0%ec%a0%95-%ed%8a%b8%eb%a6%ac%ec%9d%98-%ec%95%99%ec%83%81%eb%b8%94/)
- [https://ko.wikipedia.org/wiki/랜덤_포레스트](https://ko.wikipedia.org/wiki/%EB%9E%9C%EB%8D%A4_%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8)
- [https://datapedia.tistory.com/21](https://datapedia.tistory.com/21)
- [https://www.datatrained.com/post/decision-tree-vs-random-forest/](https://www.datatrained.com/post/decision-tree-vs-random-forest/)
- [http://www.dinnopartners.com/__trashed-4/](http://www.dinnopartners.com/__trashed-4/)