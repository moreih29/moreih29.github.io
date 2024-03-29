---
layout: post
title: 결정 트리(Decision Tree)
comments: true
categories: [research]
tags: [machine-learning, classification, regression]
description: >
  회귀나 분류 문제를 해결하기 위해 널리 사용되는 기법인 결정 트리를 알아봅니다.
hide_last_modified: true
# hide_image: true
image: 
  path: https://tensorflowkorea.files.wordpress.com/2017/06/2-22.png?w=768&h=546
  srcset: 
    1920w: https://tensorflowkorea.files.wordpress.com/2017/06/2-22.png?w=768&h=546
    960w: https://tensorflowkorea.files.wordpress.com/2017/06/2-22.png?w=768&h=546
    480w: https://tensorflowkorea.files.wordpress.com/2017/06/2-22.png?w=768&h=546
---

# 결정 트리(Decision Tree)

기존 데이터를 잘 나눌 수 있는 기준들을 찾는다면, 
새로운 데이터가 들어와도 그 기준에 맞게 잘 나눌 수 있지 않을까요?
결정 트리는 데이터를 잘 나눌 수 있는 기준을 찾아 문제를 해결합니다.
{: .first} 

* toc
{:toc}

## 개요
결정 트리는 분류와 회귀 문제에서 널리 사용되는 머신러닝 방법입니다. 
마치 스무 고개 게임을 하는 것과 같이, 질문을 주고 데이터를 나눕니다.
이러한 결정 방식은 질문의 내용을 명확하게 확인할 수 있기 때문에 모델의 결정을 설명하기 쉽습니다.
다만, 데이터를 나누는 질문(조건)을 너무 많이하게 된다면, 기존 데이터는 잘 나눌 수 있을지 모르지만
새로운 데이터에 대해서는 대응하기 어려울 수 있습니다.

## 동작 방식
---
![](https://tensorflowkorea.files.wordpress.com/2017/06/2-23.png?w=768)
{: .lead}

예제 데이터 분포
{: .figcaption}

다음과 같은 분포를 갖는 데이터가 있다고 가정해봅시다. 
데이터는 두 개의 클래스를 가지고 있고 각 클래스는 반대되는 반달 모양의 분포를 갖고 있습니다.
이럴 때 결정 트리는 어떻게 동작하는지 설명하겠습니다.

### Step 1

![](https://tensorflowkorea.files.wordpress.com/2017/06/2-24.png?w=768){: .wb}
{: .lead}

첫 번째 질문을 하며 데이터를 분류합니다.
소개에서 설명드린 예제와는 조금 다르게 질문의 형태가 "특성 i는 값 a보다 큰가?"와 같은 기준으로 나뉘어집니다. 
보시는 것과 같이 첫 번째 질문(노드)는 *"X[1]이 0.0596 이하 인가? (X[1] <= 0.0596)"* 입니다. 
여기서 X[0]는 가로 축을 의미하고 X[1]은 세로 축을 의미합니다.
결정 트리는 첫 번째 질문(분기)를 통해서 전체 데이터를 두 개의 영역으로 나눴고 질문에 yes라고 대답할 수 있는 영역은 2개의 파란색 클래스와 32개의 붉은색 클래스를 포함하고 있으며, no라고 대답할 수 있는 영역은 48개의 파란색 클래스와 18개의 붉은색 클래스를 포함하고 있습니다.

### Step 2
![](https://tensorflowkorea.files.wordpress.com/2017/06/2-25.png?w=768){: .wb}
{: .lead}

Step 1과 같이 질문을 던져, 두 개의 클래스를 구분합니다.
이 때, 질문은 두 개의 클래스를 더 명확하게 구분 할수록 (구분된 영역에 하나의 클래스만 더 많이 포함될 수 있도록) 좋은 질문이 되며, 모델은 그러한 질문을 찾기 위해 학습합니다.

### Step k
![](https://tensorflowkorea.files.wordpress.com/2017/06/2-26.png?w=768){: .wb}
{: .lead}

위의 과정을 지속적으로 반복하여 데이터의 모든 포인트에 대해 클래스를 나눌 수 있는 질문들을 찾습니다.
최종적으로 여러 질문들을 통해 분할된 영역들을 **리프(leaf)** 노드라고 합니다. 
이렇게 질문들이 뻗어나가는 모양이 나무의 가지와 닮았고 그 끝에 잎사귀가 있다고 생각하시면 됩니다.
또한, 분할된 리프 노드에 데이터 포인트가 한 개만 포함된 경우를 **순수(pure)** 노드라고 합니다.

위에도 잠깐 나왔지만, 결정 트리의 학습 과정은 데이터가 주어졌을 때 잘 분류할 수 있는 질문들을 찾아가는 과정을 의미합니다.
예측 과정은 새로운 데이터를 넣어 학습 과정에서 찾아진 조건들에 맞춰 따라갔을 때 나오는 영역으로 해당 데이터를 분류합니다.
회귀 문제에서도 동일하게 적용될 수 있고 출력은 결과적으로 선택된 리프 노드의 **평균**값을 사용합니다.

## 복잡도 제어
---
주어진 데이터에서 모든 데이터 포인트를 잘 분류하도록 학습한다는 것은 무엇을 의미할까요?
아마 각각의 데이터 포인트가 클래스를 분류하는 영역에 포함되어 있다면(모든 리프 노드가 순수 노드가 된다면) 분류 정확도는 100%가 될 것입니다.
하지만 그렇게 된 경우 새롭게 등장하는 데이터에 대해 정확도가 매우 떨어지게 될 것이고 이것을 우리는 모델이 데이터에 **과적합**되었다고 판단합니다.
과적합을 막는 전략으로 트리의 깊이를 조절하는 **사전 가지치기(pre-pruning)**과 **사후 가지치기(post-pruning)**이 있으며 파이썬의 머신 러닝 라이브러리 중 하나인 scikit-learn은 사전 가지치기만 지원하고 있습니다.

## 예제 코드
---
[https://github.com/moreih29/decision_tree-tutorial/](https://github.com/moreih29/decision_tree-tutorial/){: target="_blank"}

## Reference
---
- [https://tensorflow.blog/파이썬-머신러닝/2-3-5-결정-트리/](https://tensorflow.blog/파이썬-머신러닝/2-3-5-결정-트리/){: target="_blank"}
- [https://bkshin.tistory.com/entry/머신러닝-4-결정-트리Decision-Tree](https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-4-%EA%B2%B0%EC%A0%95-%ED%8A%B8%EB%A6%ACDecision-Tree){: target="_blank"}