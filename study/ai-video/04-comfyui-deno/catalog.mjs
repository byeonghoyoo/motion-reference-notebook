// SPDX-License-Identifier: GPL-3.0-only
// Korean node summaries derived from DENO's GPL-3.0-only documentation.
export const nodeNotes = [
 ['DenoResolutionSetup','준비','이미지 크기와 구도부터 정하기','비율·메가픽셀·크롭 위치를 정하고 결과 이미지와 가로·세로 크기를 전달합니다.','보조','deno-resize-box'],
 ['DenoMultiImageLoader','준비','참조 이미지를 한 줄로 연결','사진 순서를 바꾸고 사용할 사진만 켭니다. 같은 제품·인물의 참조를 정리할 때 출발점입니다.','보조','deno-multi-image-loader'],
 ['DenoAdvancedImageSourceLoader','준비','폴더와 크기가 다른 이미지 묶음','폴더 업로드, 배치 연결, 서로 다른 원본 크기를 유지하는 이미지 목록을 다룹니다.','보조','deno-advanced-image-source-loader'],
 ['DenoMiniMaxH3ReferenceImageLoader','준비','H3 이미지·오디오 참조 정리','이미지 최대 9장과 오디오 최대 3개를 개별 비율·순서대로 준비합니다.','모델','deno-minimax-h3-multi-reference-image-loader'],
 ['DenoMiniMaxH3ReferenceToVideo','생성','H3 다중 참조를 생성 경로에 전달','전용 이미지 입력과 순정 H3 참조 영상·오디오 입력을 이어줍니다. ComfyUI 0.30.0 이상이 필요합니다.','모델','deno-minimax-h3-multi-reference-image-loader'],
 ['DenoMiniMaxH3AccLoader','생성','H3 가속 LoRA 불러오기','모델 계열에 맞는 공식 Acc-LoRA를 사용합니다. 기본 권장값은 Simple/Euler 8-step이며 별도 가중치가 필요합니다.','모델','deno-minimax-h3-acc-lora-loader'],
 ['DenoMiniMaxH3TiledSampler','생성','H3 고해상도 마무리를 조각으로','확대한 영상 latent의 마지막 패스를 겹치는 타일로 처리합니다. 문서의 16GB 측정값은 맥 성능 보장이 아닙니다.','모델','deno-minimax-h3-tiled-sampler'],
 ['DenoAudioTranscript','준비','오디오에서 대사와 시간 추출','로컬 Whisper로 대사·가사와 구간 시간을 추출합니다. 첫 실행에는 음성 인식 모델을 내려받습니다.','모델','minimax-h3-r2v-audio-reference-workflow'],
 ['DenoAudioAnalysisFinalize','준비','음향 분석을 프롬프트 자료로','음향 보고서에서 필요한 항목을 정리하고 선택적으로 분석용 모델을 내립니다.','모델','minimax-h3-r2v-audio-reference-workflow'],
 ['DenoTextEncoderUnload','생성','인코딩 뒤 메모리 여유 확보','프롬프트 인코딩 이후 text encoder를 내리는 시점을 정합니다. 다음 인코딩 때 다시 불러오는 시간은 필요합니다.','보조','deno-text-encoder-unload'],
 ['DenoLTXSequencer','생성','여러 이미지로 장면 순서 설계','이미지마다 프레임 위치와 강도를 정해 LTX 생성의 가이드로 사용합니다.','모델','deno-ltx-sequencer'],
 ['DenoLTX23PresetLoader','생성','LTX 모델 로딩을 한곳에서','Checkpoint·KJ·GGUF 로딩 경로를 선택합니다. 선택한 방식에 따라 KJNodes 또는 ComfyUI-GGUF가 필요합니다.','모델','deno-ltx-model-loader'],
 ['DenoLTXModelDownloader','준비','모델 링크와 저장 위치 확인','공식 다운로드 페이지와 목표 경로를 안내합니다. 노드를 추가했다고 모델까지 설치되는 것은 아닙니다.','보조','deno-easy-model-download-helper'],
 ['DenoMultiLoraLoader','생성','여러 LoRA를 한 번에 관리','최대 64개 슬롯의 켜기·끄기, 강도와 메모를 관리합니다. 모델 계열에 맞는 LoRA를 선택합니다.','모델','deno-multi-lora-loader'],
 ['DenoLTXMultiLoraLoader','생성','LTX 영상·음성 LoRA 강도 조절','영상과 오디오 강도를 나누고 트리거 단어·메모를 보관합니다.','모델','deno-ltx-multi-lora-loader'],
 ['DenoLTXPromptGuide','생성','LTX 프롬프트와 대사 길이 계획','프롬프트 인코딩과 프레임레이트를 묶고, 대사의 최소 길이를 추정합니다. 한국어 추정을 지원합니다.','모델','deno-ltx-prompt-guide'],
 ['DenoLTXTiledSpatialUpscaler','마무리','LTX 영상 latent를 타일 업스케일','영상 전용 latent를 조각으로 확대합니다. 결합된 오디오 경로는 문서의 분리·재결합 안내를 확인합니다.','모델','deno-ltx-tiled-spatial-upscaler'],
 ['DenoLTXAVStepFusedTiledSampler','마무리','LTX 고해상도 2차 패스','겹치는 타일 예측을 합쳐 고해상도 영상·오디오 refinement를 수행합니다.','모델','deno-ltx-high-resolution-tiled-sampler'],
 ['DenoBerniniPromptGuide','생성','Bernini 편집 프롬프트 준비','이미지·영상 편집용 positive/negative 지시와 conditioning을 구성합니다. Bernini 지원 환경이 필요합니다.','모델','deno-bernini-prompt-guide'],
 ['DenoIdeogramDirector','생성','포스터 요소의 위치를 직접 설계','박스 영역을 그려 제목·제품·배경을 배치하고 Ideogram 4용 JSON 프롬프트로 연결합니다.','모델','deno-ideogram-director'],
 ['DenoLocalLLMRefiner','생성','같은 컴퓨터의 LLM으로 프롬프트 작성','현재 문서 기준 Ollama 또는 LM Studio의 고정 로컬 주소만 지원합니다. 다른 맥의 oMLX에 바로 연결되는 구성은 아닙니다.','모델','deno-local-llm-loader-and-deno-local-llm-reviewer'],
 ['DenoAIReviewGate','비교','저장 전에 결과 검토','Local LLM 작업의 결과를 확인하고 다음 저장 단계로 넘기는 검토 흐름에 사용합니다.','모델','deno-local-llm-loader-and-deno-local-llm-reviewer'],
 ['DenoPromptText','준비','긴 프롬프트를 읽기 좋게 보관','여러 줄 텍스트를 STRING 출력으로 연결하는 기본 노드입니다.','보조','deno-prompt-text'],
 ['DenoRTXVFXEasyUpscale','마무리','RTX로 선명도와 크기 보정','NVIDIA VSR·노이즈 제거·흐림 개선을 선택하는 Windows RTX 도구입니다. 맥에서는 이 경로를 사용하지 않습니다.','RTX','deno-rtx-video-super-resolution'],
 ['DenoRTXVFXVideoFinisher','마무리','정리와 확대를 두 단계로','먼저 정리하고 다음으로 업스케일하는 RTX 전용 마감입니다. nvidia-vfx 런타임이 별도로 필요합니다.','RTX','deno-rtx-video-super-resolution-2-pass'],
 ['DenoImageCompare','비교','이미지 전후를 나란히 비교','슬라이더·나란히·차이·전환 보기로 결과를 비교합니다.','보조','deno-image-compare'],
 ['DenoFilmGrain','마무리','사진과 영상의 질감 마감','CPU 기반 그레인을 해상도에 맞춰 더합니다. 피부·제품 라벨이 뭉개지지 않는 강도로 확인합니다.','보조','deno-film-grain'],
 ['DenoVideoCompare','비교','같은 프레임의 A/B 영상 검수','프레임을 맞춰 영상과 오디오를 비교하고 비교용 결과를 저장합니다.','보조','deno-video-compare'],
 ['DenoVideoPreview','비교','그래프 중간에서도 영상 확인','전체 해상도 H.264 미리보기로 중간 결과를 확인합니다. 현재 ComfyUI에 포함되는 PyAV를 사용합니다.','보조','deno-video-preview']
];

export const resources = [
 ['DENO AI HUB','원본 허브','ComfyUI·도구·음악·커뮤니티를 모은 출발점.','https://deno2026.github.io/Deno-AI-HUB/#comfyui','원본'],
 ['공개 워크플로 공유','원본 파일','ComfyUI 외에 AI Agents·힉스필드·Pollo AI 폴더도 있는 최상위 공유함.','https://drive.google.com/drive/folders/1Aq9yzvSMpM9EOQMIVEIwyrXd3LmcM5D6','자료'],
 ['Deno Custom Nodes','노드 패키지','노드 코드·한국어 문서·릴리스·예제 워크플로.','https://github.com/Deno2026/comfyui-deno-custom-nodes','로컬'],
 ['DENO Video Compare','브라우저','두 영상을 슬라이더·분할·차이 보기로 비교.','https://deno2026.github.io/comfyui-deno-custom-nodes/video-compare/','웹 도구'],
 ['DENO Video to GIF/WebP','브라우저','짧은 영상을 자르고 크기를 조정해 GIF·WebP로 변환.','https://deno2026.github.io/comfyui-deno-custom-nodes/video-to-gif/','웹 도구'],
 ['DENO Discord Media Compressor','브라우저','공유할 영상·이미지 용량을 줄이는 한국어 도구.','https://deno2026.github.io/comfyui-deno-custom-nodes/video-to-discord/','웹 도구'],
 ['DENO Video Player','Windows','로컬 영상·오디오·이미지 플레이어.','https://github.com/Deno2026/deno-video-player','Windows'],
 ['DENO Video Downloader','Windows','공개 또는 이용 가능한 영상의 다운로드 도구.','https://github.com/Deno2026/DENO-Video-Downloader/releases/latest','Windows'],
 ['DENO AI Studio Installer','Windows','AI Studio용 설치 도우미. 맥용 Comfy Desktop 설치와 구분.','https://github.com/Deno2026/Windows-Installer-for-Deno-AI-Studio','Windows'],
 ['DENO Music Library','음원 라이브러리','BGM·보컬곡을 미리 듣고 찾는 원본 라이브러리. 곡과 모델의 적용 조건은 원문에서 확인.','https://deno2026.github.io/DENO-Music-Library/','음악'],
 ['DENO YouTube','강의·시연','노드 사용과 영상 제작 시연을 확인하는 원작자 채널.','https://www.youtube.com/@Denoise-AI','강의'],
 ['DENO Discord','커뮤니티','질문과 업데이트를 확인하는 원본 커뮤니티. 가입·메시지 전송은 이 가이드에서 실행하지 않음.','https://discord.gg/HfrdkT3FjE','커뮤니티'],
 ['Comfy Cloud','별도 비용 경로','허브에 있는 클라우드 서비스. 이 가이드의 추가 유료 API 0원 제작 경로에서는 사용하지 않음.','https://www.comfy.org/cloud','유료·별도']
];

export const workflowNotes = {
 'Bernini':'이미지·영상 편집용 구성. 함께 제공된 BAT는 Windows 파일입니다.',
 'IDEOGRAM Director':'요소 위치를 설계하는 포스터·이미지 제작 구성입니다.',
 'LTX2.3':'이미지·오디오·다중 참조와 메모리 절약 구성의 하위 폴더를 모두 연결했습니다.',
 'Minimax':'H3 참조 영상, 가속 설정, 발화 관련 안내 자료를 모았습니다.',
 'RTX 2pass Upscale workflow':'Windows NVIDIA RTX 전용. 맥 제작 경로에서는 제외합니다.',
 'Z image':'이미지 생성 구성과 원작자의 참고 이미지를 연결합니다.',
 'LTX2.3 / 4K tiled sampler node':'고해상도 타일 샘플링 실험용 파일과 설명입니다. 처음부터 4K로 시작하지 않습니다.',
 'LTX2.3 / 8GB VRAM Workflow':'폴더명의 8GB는 원작자의 구성 이름입니다. 맥의 통합 메모리 8GB에서 동작한다는 뜻이 아닙니다.',
 'LTX2.3 / Audio To Video':'오디오를 바탕으로 영상을 만드는 구성과 참조 파일입니다.',
 'LTX2.3 / Image to Video':'이미지 기반 영상의 세 가지 버전을 각각 보관합니다.',
 'LTX2.3 / Video to audio (wan2.2)':'영상에 맞는 오디오 제작 구성과 튜토리얼 링크입니다.',
 'LTX2.3 / Image to Video / ver1 (260318)':'초기 이미지 영상 구성. 클라우드 제한 안내는 로컬 무료 경로와 구분해서 읽습니다.',
 'LTX2.3 / Image to Video / ver2 (dynamic) (260329)':'dynamic 버전의 구성과 참조 이미지입니다.',
 'LTX2.3 / Image to Video / ver3 (Multi Image) (260412)':'다중 이미지 참조 버전의 구성과 예시 이미지 두 장입니다.'
};
