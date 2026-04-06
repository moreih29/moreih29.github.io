<!-- tags: llm, serving, inference, vllm, sglang, tgi, tensorrt-llm, ollama, llama.cpp, benchmark -->
# LLM 서빙 프레임워크 종합 참고자료 (2024~2026)

**조사 일자**: 2026-04-06
**전체 리포트**: `.nexus/state/artifacts/llm-serving-1-research.md`

## 주요 프레임워크 요약

| 프레임워크 | 개발 주체 | 라이선스 | GitHub Stars | 상태 |
|-----------|---------|---------|-------------|------|
| vLLM | UC Berkeley + 커뮤니티 | Apache 2.0 | ~75,400 | 활발 (업계 표준) |
| SGLang | LMSYS Org | Apache 2.0 | ~25,000 | 급성장 (de facto 프로덕션) |
| TGI | Hugging Face | Apache 2.0 | ~15,000 | 유지보수 모드 (2025.12) |
| TensorRT-LLM | NVIDIA | Apache 2.0 | ~13,000 | 활발 (NVIDIA 전용) |
| llama.cpp | ggml-org | MIT | ~98,600 | 활발 (로컬/엣지) |
| Ollama | Ollama Inc. | MIT | ~110,000 | 급성장 (로컬 개발) |
| LiteLLM | BerriAI | MIT | 증가세 | 활발 (API 게이트웨이) |
| LMDeploy | InternLM | Apache 2.0 | ~7,600 | 활발 (중국 연구 환경) |
| DeepSpeed-MII | Microsoft | Apache 2.0 | 수천 | 저활성도 |
| MLC LLM | MLC AI | Apache 2.0 | 수천 | 활발 (모바일/브라우저) |
| Modular MAX | Modular | 오픈소스 | - | 신규 성장세 |

## 핵심 발견

1. **TGI 2025.12 유지보수 모드 전환**: HuggingFace가 공식적으로 vLLM/SGLang 대체 권고
2. **SGLang 급부상**: 400,000+ GPU 배포, xAI·NVIDIA·Google Cloud·AWS 채택
3. **vLLM 60K stars 돌파** (2025.10), 현재 75K+
4. **llama.cpp 100K stars** (2026.03 달성)
5. **PD Disaggregation 주류화**: vLLM, SGLang, LMDeploy 모두 Prefill/Decode 분리 지원

## 주요 벤치마크 수치

- SGLang vs vLLM (H100, Llama 3.1 8B): SGLang +29% 처리량
- TensorRT-LLM p95 TTFT @ 100 req: 1,280ms vs vLLM 1,450ms
- vLLM SpecPrefill: TTFT 7.66x 향상 (Llama-3.1-405B-FP8)
- SGLang GB200: 26,000 input tokens/sec/GPU (DeepSeek R1)
- TGI v3.0: 긴 프롬프트에서 vLLM 대비 13x 빠름

## 주요 소스 URL

- vLLM: https://github.com/vllm-project/vllm
- SGLang: https://github.com/sgl-project/sglang
- TGI: https://github.com/huggingface/text-generation-inference
- TensorRT-LLM: https://github.com/NVIDIA/TensorRT-LLM
- llama.cpp: https://github.com/ggml-org/llama.cpp
- Ollama: https://github.com/ollama/ollama
- LMDeploy: https://github.com/InternLM/lmdeploy
- DeepSpeed-MII: https://github.com/deepspeedai/DeepSpeed-MII
- MLC LLM: https://github.com/mlc-ai/mlc-llm
- Modular MAX: https://www.modular.com/max
