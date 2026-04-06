<!-- tags: llm, serving, inference, vllm, quantization, parallelism, speculative-decoding, flashattention -->
# LLM 서빙 핵심 기술 참고자료

**조사일:** 2026-04-06
**전체 리포트:** `.nexus/state/artifacts/llm-serving-2-research.md`

## 핵심 출처 목록

### 메모리 최적화
- PagedAttention 원논문: https://arxiv.org/abs/2309.06180 (SOSP'23)
- vLLM 공식 문서 (Paged Attention): https://docs.vllm.ai/en/stable/design/paged_attention/
- vLLM Automatic Prefix Caching: https://docs.vllm.ai/en/stable/design/prefix_caching/
- SGLang RadixAttention (LMSYS Blog): https://www.lmsys.org/blog/2024-01-17-sglang/

### 배치 전략
- Continuous Batching 원리 (Anyscale, 23x 처리량): https://www.anyscale.com/blog/continuous-batching-llm-inference
- HuggingFace Continuous Batching: https://huggingface.co/blog/continuous_batching
- Static/Dynamic/Continuous 비교 (BentoML): https://bentoml.com/llm/inference-optimization/static-dynamic-continuous-batching

### 양자화
- GPTQ/AWQ/GGUF 원리 비교 (Cast AI): https://cast.ai/blog/demystifying-quantizations-llms/
- vLLM 양자화 벤치마크 (JarvisLabs): https://docs.jarvislabs.ai/blog/vllm-quantization-complete-guide-benchmarks
- vLLM FP8 문서: https://docs.vllm.ai/en/latest/features/quantization/fp8/
- FP8 33% 속도 향상 (Baseten): https://www.baseten.co/blog/33-faster-llm-inference-with-fp8-quantization/
- QSpec (양자화+Speculative Decoding 결합): https://arxiv.org/html/2410.11305v1

### 병렬화
- TP/PP/SP/EP 통합 설명 (NVIDIA): https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/
- Meta Expert Parallelism 스케일링: https://engineering.fb.com/2025/10/17/ai-research/scaling-llm-inference-innovations-tensor-parallelism-context-parallelism-expert-parallelism/
- MegaScale-Infer MoE EP (SIGCOMM'25): https://dl.acm.org/doi/10.1145/3718958.3750506

### 디코딩 최적화
- EAGLE GitHub: https://github.com/SafeAILab/EAGLE
- vLLM Speculative Decoding (2.8x 향상): https://blog.vllm.ai/2024/10/17/spec-decode.html
- vLLM Structured Decoding 소개: https://blog.vllm.ai/2025/01/14/struct-decode-intro.html
- Chunked Prefill (vLLM 문서): https://docs.vllm.ai/en/stable/configuration/optimization/

### 최신 기술 (2025~2026)
- DistServe Disaggregated Inference (OSDI'24): https://www.usenix.org/system/files/osdi24-zhong-yinmin.pdf
- Disaggregated Inference 18개월 회고 (Hao AI Lab): https://haoailab.com/blogs/distserve-retro/
- FlashAttention-3 원논문: https://arxiv.org/pdf/2407.08608
- FlashAttention-3 저자 블로그: https://tridao.me/blog/2024/flash3/
- vLLM torch.compile 통합: https://blog.vllm.ai/2025/08/20/torch-compile.html

## 핵심 수치 (빠른 참조)

| 기술 | 주요 수치 |
|---|---|
| PagedAttention | KV 캐시 낭비 60~80% → 4% 미만, 처리량 2~4배 |
| Continuous Batching | 최대 10~23배 처리량 향상 |
| AWQ (Marlin 커널) | 741 tok/s (FP16보다 빠름) |
| FP8 | 메모리 2배 절감, 처리량 최대 1.6배, 속도 최대 33% |
| FlashAttention-3 | H100에서 840 TFLOPs/s (BF16), GPU 활용률 35%→75% |
| FlashAttention-4 | Blackwell cuDNN 대비 최대 22% 빠름 |
| EAGLE-3 | 2~6배 속도 향상 |
| Speculative Decoding (vLLM) | 최대 2.8배 처리량 향상 |

## Null Results (검색했으나 부재 확인)
- FlashAttention-4의 AMD ROCm 지원 현황: 검색 결과 없음
- GGUF의 GPU 전용 최적화 커널: 존재하지 않음 (CPU/Apple Silicon 전용)
- FP4 추론(Blackwell)의 실제 정확도/속도 벤치마크: 2026년 4월 기준 데이터 부족
