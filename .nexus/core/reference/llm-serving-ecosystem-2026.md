<!-- tags: llm, serving, inference, cloud, vllm, sglang, ollama, disaggregated, moe, gpu-cost -->
# LLM 서빙 생태계 참조 (조사일: 2026-04-06)

## 클라우드 플랫폼 점유율
- AWS (SageMaker/Bedrock): 34%, Google Vertex AI: 22%, Azure ML/AI Foundry: 29%

## 핵심 추론 엔진 (2026 기준)
- vLLM: 범용, 프로덕션 표준, Meta/LinkedIn/Mistral 채택
- TensorRT-LLM: NVIDIA 특화 최고 처리량 (H100 8× 4,800 tok/s)
- SGLang: RadixAttention 공유 프리픽스 캐싱, RAG·챗봇 최적
- TGI: 2025년 12월 유지관리 모드 전환 (Hugging Face가 vLLM/SGLang 권장)

## LLM 게이트웨이 3강
- LiteLLM: 오픈소스, 셀프호스팅, 100+ LLM 통합
- OpenRouter: 200+ 모델, 2M+ 사용자, 즉시 접근
- Portkey: 엔터프라이즈, 시맨틱 캐싱 30~50% 비용 절감

## GPU 가격 (2026)
- H100: $1.25~$14.90/hr (RunPod 커뮤니티 ~$1.99, Lambda ~$2.99)
- A100: $1.29~$2.29/hr
- 추론 효율: H100 $0.47/M 토큰 (70B 모델 기준)

## 주요 트렌드
- Disaggregated prefill/decode: Meta·LinkedIn·Mistral 프로덕션 운영
- NVIDIA Dynamo (GTC 2025): disaggregated + 동적 GPU 스케줄링 오픈소스
- MoE 아키텍처: 2025년 프론티어 모델의 60%+ 채택
- vLLM v0.16.0 (2026-02): NVIDIA+AMD ROCm+Intel XPU+TPU 멀티플랫폼

## 로컬 서빙
- llama.cpp + GGUF 포맷이 생태계 기반 (2026-02 Hugging Face 합류)
- Ollama: 사실상 표준 CLI, LM Studio 대비 20~30% 빠름
- Q4_K_M 양자화: 크기 75% 감소, 품질 92% 유지

## 관찰성 스택
- OpenTelemetry: 사실상 표준, TTFT + 토큰당 지연이 핵심 메트릭
- Prometheus v3.10.0 + Grafana: 실시간 모니터링 표준 조합
- OpenLLMetry: OTel 기반 LLM 특화 오픈소스 계측 라이브러리

## 전체 보고서
- `/Users/kih/workspaces/resources/moreih29-blog/.nexus/state/artifacts/llm-serving-3-research.md`
