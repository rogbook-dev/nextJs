"use client";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function EmailManagementPage() {
  const router = useRouter();

  useEffect(() => {
    // 새 이메일 캠페인 작성 폼 보이기/숨기기 로직
    const openButton = document.getElementById('openNewCampaignForm');
    const closeButton = document.getElementById('closeNewCampaignForm');
    const backToListButton = document.getElementById('backToListButton'); // 목록으로 돌아가기 버튼
    const campaignFormSection = document.getElementById('newCampaignFormSection');
    const campaignListSection = document.querySelector('.card:not(#newCampaignFormSection)'); // 목록 섹션 (폼 섹션 제외)

    function showForm() {
      campaignFormSection?.classList.remove('hidden');
      campaignListSection?.classList.add('hidden'); // 목록 숨기기
    }

    function hideForm() {
      campaignFormSection?.classList.add('hidden');
      campaignListSection?.classList.remove('hidden'); // 목록 보이기
    }

    openButton?.addEventListener('click', showForm);
    closeButton?.addEventListener('click', hideForm);
    backToListButton?.addEventListener('click', hideForm);

    // 예약 발송 옵션 보이기/숨기기
    const sendOptionRadios = document.querySelectorAll('input[name="sendOption"]');
    const scheduleOptionsDiv = document.getElementById('scheduleOptions');

    sendOptionRadios.forEach(radio => {
      radio.addEventListener('change', function (this: HTMLInputElement) {
        if (this.value === 'later') {
          scheduleOptionsDiv?.classList.remove('hidden');
        } else {
          scheduleOptionsDiv?.classList.add('hidden');
        }
      });
    });

    // 초기 상태에서 예약 옵션 숨김 (만약 '즉시 발송'이 기본 체크라면)
    if ((document.getElementById('sendNow') as HTMLInputElement)?.checked) {
      scheduleOptionsDiv?.classList.add('hidden');
    }

    // cleanup
    return () => {
      openButton?.removeEventListener('click', showForm);
      closeButton?.removeEventListener('click', hideForm);
      backToListButton?.removeEventListener('click', hideForm);
      sendOptionRadios.forEach(radio => {
        radio.removeEventListener('change', function () {});
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>이메일 발송 및 관리 - HTML 목업</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
          ::-webkit-scrollbar-track { background-color: #f1f5f9; }
          .sidebar-icon { width: 20px; height: 20px; }
          .table th, .table td { padding: 12px 16px; border-bottom-width: 1px; border-color: #e5e7eb; text-align: left; font-size: 0.875rem; }
          .table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
          .table td { color: #4b5563; }
          .btn { padding: 8px 16px; border-radius: 6px; font-size: 0.875rem; font-weight: 500; transition: background-color 0.2s; display: inline-flex; align-items: center; justify-content: center; }
          .btn-primary { background-color: #3b82f6; color: white; }
          .btn-primary:hover { background-color: #2563eb; }
          .btn-secondary { background-color: #e5e7eb; color: #374151; }
          .btn-secondary:hover { background-color: #d1d5db; }
          .input-field { border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; }
          .input-field:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
          .card { background-color: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 24px; }
          .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
          .badge-green { background-color: #d1fae5; color: #065f46; }
          .badge-yellow { background-color: #fef3c7; color: #92400e; }
          .badge-blue { background-color: #dbeafe; color: #1e40af; }
          .badge-red { background-color: #fee2e2; color: #991b1b; }
          .badge-gray { background-color: #f3f4f6; color: #4b5563; }
        `}</style>
      </Head>
      <div className="flex h-screen">
        {/* Sidebar matching the provided image */}
        <aside className="w-64 bg-white shadow-md flex flex-col items-center pt-6">
          {/* Logo */}
          <div className="mb-8 w-full flex justify-center">
            <span className="text-3xl font-extrabold tracking-widest text-[#22304A]" style={{ letterSpacing: '0.1em' }}>CONIA WORLD</span>
          </div>
          <nav className="w-full flex-1 flex flex-col space-y-2 px-4">
            {/* 상품/재고 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">상품/재고</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-cart-shopping"></i></span>
                <span className="flex-1 text-left">상품/재고</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 주문/배송 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">주문/배송</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-plane"></i></span>
                <span className="flex-1 text-left">주문/배송</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 상점 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">상점</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-store"></i></span>
                <span className="flex-1 text-left">상점</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 회원 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">회원</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-regular fa-user"></i></span>
                <span className="flex-1 text-left">회원</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 정산 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">정산</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-calculator"></i></span>
                <span className="flex-1 text-left">정산</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 마케팅 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">마케팅</div>
              <div className="flex flex-col">
                <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                  <span className="mr-3 text-xl"><i className="fa-solid fa-money-check-dollar"></i></span>
                  <span className="flex-1 text-left">마케팅</span>
                  <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
                </button>
                {/* 마케팅 하위 메뉴 */}
                <div className="ml-8 mt-1 flex flex-col space-y-1">
                  <a href="/email-management" className="px-2 py-1 rounded text-[15px] font-semibold text-blue-600 bg-blue-50">이메일 캠페인 관리</a>
                  {/* 다른 마케팅 하위 메뉴가 있다면 여기에 추가 */}
                </div>
              </div>
            </div>
            {/* 권한 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">권한</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-key"></i></span>
                <span className="flex-1 text-left">권한</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 운영지원 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">운영지원</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-regular fa-user"></i></span>
                <span className="flex-1 text-left">운영지원</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
            {/* 설정 */}
            <div className="mb-2">
              <div className="text-xs text-gray-400 font-semibold mb-1 ml-2">설정</div>
              <button className="flex items-center w-full px-2 py-2 rounded-lg text-base font-bold text-[#22304A] hover:bg-gray-100 transition group">
                <span className="mr-3 text-xl"><i className="fa-solid fa-gear"></i></span>
                <span className="flex-1 text-left">설정</span>
                <span className="ml-auto text-gray-400 group-hover:text-[#22304A]"><i className="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">이메일 캠페인 관리</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">버전: M_1.0</span>
              <span className="text-sm text-gray-500">페이지 코드: RWEINC_M_0001</span>
              <i className="fas fa-user-circle text-2xl text-gray-400"></i>
            </div>
          </header>

          <div className="p-6 bg-gray-50 border-b">
            <p className="text-sm text-gray-500">Home &gt; <span className="font-medium text-gray-700">이메일 캠페인 관리</span></p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* 캠페인 목록 테이블형 UI (이미지 스타일) */}
            <div className="bg-white rounded-xl shadow border p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="text-gray-700 font-bold text-lg">이메일 캠페인 목록</div>
                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    id="openNewCampaignForm"
                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold flex items-center gap-2 hover:bg-blue-600 text-base shadow-sm"
                    onClick={() => router.push('/email-management/new')}
                  >
                    <i className="fa-solid fa-plus"></i>새 이메일 캠페인 만들기
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base shadow-sm"><i className="fa-solid fa-paper-plane"></i>이메일 테스트 발송</button>
                </div>
              </div>
              {/* 필터 영역 - 이미지 스타일 */}
              <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="statusFilter" className="block text-base font-semibold text-slate-600 mb-2">발송 상태</label>
                    <select id="statusFilter" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option value="all">전체</option>
                      <option value="completed">발송 완료</option>
                      <option value="scheduled">예약됨</option>
                      <option value="preparing">준비중</option>
                      <option value="failed">발송 실패</option>
                      <option value="draft">작성중</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateStartFilter" className="block text-base font-semibold text-slate-600 mb-2">발송(예약)일 시작</label>
                    <input type="date" id="dateStartFilter" placeholder="연도. 월. 일." className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label htmlFor="dateEndFilter" className="block text-base font-semibold text-slate-600 mb-2">발송(예약)일 종료</label>
                    <input type="date" id="dateEndFilter" placeholder="연도. 월. 일." className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label htmlFor="searchFilter" className="block text-base font-semibold text-slate-600 mb-2">검색어</label>
                    <input type="text" id="searchFilter" placeholder="캠페인명, 이메일 제목" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="px-6 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb]"><i className="fa-solid fa-rotate-left"></i>초기화</button>
                  <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold flex items-center gap-2 hover:bg-blue-600"><i className="fa-solid fa-magnifying-glass"></i>조회</button>
                </div>
              </div>
              <div className="mb-2 text-sm text-gray-600">총 <span className="font-semibold">123</span>건</div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700 text-sm">
                      <th className="px-3 py-2 text-left align-middle"><input type="checkbox" className="input-field rounded" /></th>
                      <th className="px-3 py-2 text-left align-middle">캠페인 이름</th>
                      <th className="px-3 py-2 text-left align-middle">이메일 제목</th>
                      <th className="px-3 py-2 text-left align-middle">발송 대상</th>
                      <th className="px-3 py-2 text-left align-middle">발송(예약) 일시</th>
                      <th className="px-3 py-2 text-left align-middle">상태</th>
                      <th className="px-3 py-2 text-left align-middle">주요 결과 (발송/성공/실패)</th>
                      <th className="px-3 py-2 text-center align-middle">관리</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {/* 1 */}
                    <tr className="bg-white hover:bg-blue-50 transition">
                      <td className="px-3 py-2 align-middle"><input type="checkbox" className="input-field rounded" /></td>
                      <td className="px-3 py-2 align-middle font-medium">5월 신제품 출시 안내</td>
                      <td className="px-3 py-2 align-middle">[긴급] 5월 특별 할인! 놓치지 마세요!</td>
                      <td className="px-3 py-2 align-middle">VIP 고객 그룹</td>
                      <td className="px-3 py-2 align-middle">2025-05-15 10:00</td>
                      <td className="px-3 py-2 align-middle"><span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold"><i className="fa-solid fa-circle-check"></i>발송완료</span></td>
                      <td className="px-3 py-2 align-middle">1500 / 1480 / 20</td>
                      <td className="px-3 py-2 align-middle text-center">
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="상세보기"><i className="fa-solid fa-eye text-gray-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="복사"><i className="fa-solid fa-copy text-gray-500"></i></button>
                      </td>
                    </tr>
                    {/* 2 */}
                    <tr className="bg-white hover:bg-blue-50 transition">
                      <td className="px-3 py-2 align-middle"><input type="checkbox" className="input-field rounded" /></td>
                      <td className="px-3 py-2 align-middle font-medium">주간 뉴스레터 Vol.23</td>
                      <td className="px-3 py-2 align-middle">이번 주 꼭 알아야 할 IT 트렌드!</td>
                      <td className="px-3 py-2 align-middle">전체 구독자</td>
                      <td className="px-3 py-2 align-middle">2025-05-20 09:00</td>
                      <td className="px-3 py-2 align-middle"><span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold"><i className="fa-solid fa-clock"></i>예약됨</span></td>
                      <td className="px-3 py-2 align-middle">- / - / -</td>
                      <td className="px-3 py-2 align-middle text-center">
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="수정"><i className="fa-solid fa-pen text-gray-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="예약취소"><i className="fa-solid fa-xmark text-red-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="삭제"><i className="fa-solid fa-trash text-gray-500"></i></button>
                      </td>
                    </tr>
                    {/* 3 */}
                    <tr className="bg-white hover:bg-blue-50 transition">
                      <td className="px-3 py-2 align-middle"><input type="checkbox" className="input-field rounded" /></td>
                      <td className="px-3 py-2 align-middle font-medium">[미완료] 여름 시즌 프로모션</td>
                      <td className="px-3 py-2 align-middle">시원한 여름을 위한 특별 제안!</td>
                      <td className="px-3 py-2 align-middle">-</td>
                      <td className="px-3 py-2 align-middle">-</td>
                      <td className="px-3 py-2 align-middle"><span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold"><i className="fa-solid fa-pen"></i>작성중</span></td>
                      <td className="px-3 py-2 align-middle">- / - / -</td>
                      <td className="px-3 py-2 align-middle text-center">
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="수정"><i className="fa-solid fa-pen text-gray-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="삭제"><i className="fa-solid fa-trash text-gray-500"></i></button>
                      </td>
                    </tr>
                    {/* 4 */}
                    <tr className="bg-white hover:bg-blue-50 transition">
                      <td className="px-3 py-2 align-middle"><input type="checkbox" className="input-field rounded" /></td>
                      <td className="px-3 py-2 align-middle font-medium">4월 감사 이벤트</td>
                      <td className="px-3 py-2 align-middle">고객님께 드리는 특별한 감사 선물</td>
                      <td className="px-3 py-2 align-middle">구매 고객</td>
                      <td className="px-3 py-2 align-middle">2025-04-28 14:30</td>
                      <td className="px-3 py-2 align-middle"><span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold"><i className="fa-solid fa-circle-xmark"></i>발송실패</span></td>
                      <td className="px-3 py-2 align-middle">1000 / 0 / 1000 (API 오류)</td>
                      <td className="px-3 py-2 align-middle text-center">
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="상세보기"><i className="fa-solid fa-eye text-gray-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="재발송"><i className="fa-solid fa-rotate-right text-gray-500"></i></button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded" title="삭제"><i className="fa-solid fa-trash text-gray-500"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="mt-6 flex justify-center items-center gap-1">
                <button className="btn btn-secondary p-2 text-xs"><i className="fa-solid fa-angle-double-left"></i></button>
                <button className="btn btn-secondary p-2 text-xs"><i className="fa-solid fa-angle-left"></i></button>
                <button className="btn btn-primary p-2 text-xs w-8">1</button>
                <button className="btn btn-secondary p-2 text-xs w-8">2</button>
                <button className="btn btn-secondary p-2 text-xs w-8">3</button>
                <span className="text-gray-500">...</span>
                <button className="btn btn-secondary p-2 text-xs w-8">10</button>
                <button className="btn btn-secondary p-2 text-xs"><i className="fa-solid fa-angle-right"></i></button>
                <button className="btn btn-secondary p-2 text-xs"><i className="fa-solid fa-angle-double-right"></i></button>
              </div>
            </div>

            {/* 새 이메일 캠페인 작성 폼 */}
            <div id="newCampaignFormSection" className="card hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-700">새 이메일 캠페인 작성</h2>
                <button id="closeNewCampaignForm" className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="mb-6 border-b pb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">캠페인 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">캠페인 이름 (필수)</label>
                    <input type="text" id="campaignName" placeholder="예: 5월 신제품 출시 안내" className="input-field w-full" />
                  </div>
                  <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">발송 대상 (필수)</label>
                    <select id="targetAudience" className="input-field w-full">
                      <option>전체 구독자에게 발송</option>
                      <option>VIP 고객 주소록</option>
                      <option>뉴스레터 구독자 주소록</option>
                      {/* 스티비 API 연동 시 주소록 목록 동적 로드 */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-b pb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">이메일 콘텐츠</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="emailSubject" className="block text-sm font-medium text-gray-700 mb-1">이메일 제목 (필수)</label>
                    <input type="text" id="emailSubject" placeholder="수신자가 보게 될 이메일 제목" className="input-field w-full" />
                  </div>
                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">보내는 사람 이름 (필수)</label>
                    <input type="text" id="senderName" placeholder="예: OOO 쇼핑몰" className="input-field w-full" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">보내는 사람 이메일 주소 (필수)</label>
                  <input type="email" id="senderEmail" placeholder="예: contact@yourdomain.com (스티비 인증된 주소)" className="input-field w-full" />
                </div>
                <div>
                  <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700 mb-1">이메일 본문 (필수)</label>
                  <div className="w-full h-64 border rounded-md p-2 bg-gray-50 input-field">
                    <p className="text-gray-400">리치 텍스트 에디터 영역...</p>
                    <textarea className="w-full h-full hidden" id="emailBody"></textarea>
                  </div>
                  <div className="mt-2 space-x-2">
                    <button className="btn btn-secondary text-xs">스티비 템플릿 사용</button>
                    <button className="btn btn-secondary text-xs">HTML 직접 입력</button>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-b pb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">테스트 발송</h3>
                <div className="flex items-end space-x-2">
                  <div className="flex-grow">
                    <label htmlFor="testEmailRecipients" className="block text-sm font-medium text-gray-700 mb-1">테스트 이메일 수신 주소</label>
                    <input type="text" id="testEmailRecipients" placeholder="쉼표(,)로 구분하여 여러 개 입력" className="input-field w-full" />
                  </div>
                  <button className="btn btn-secondary whitespace-nowrap">테스트 이메일 발송</button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">발송 설정</h3>
                <div className="space-y-2 mb-4">
                  <div>
                    <input type="radio" id="sendNow" name="sendOption" value="now" className="mr-2" defaultChecked />
                    <label htmlFor="sendNow" className="text-sm font-medium text-gray-700">즉시 발송</label>
                  </div>
                  <div>
                    <input type="radio" id="sendLater" name="sendOption" value="later" className="mr-2" />
                    <label htmlFor="sendLater" className="text-sm font-medium text-gray-700">예약 발송</label>
                  </div>
                </div>
                <div id="scheduleOptions" className="grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
                  <div>
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-1">발송 날짜</label>
                    <input type="date" id="scheduleDate" className="input-field w-full" />
                  </div>
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">발송 시간</label>
                    <input type="time" id="scheduleTime" className="input-field w-full" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button id="backToListButton" className="btn btn-secondary">목록으로 돌아가기</button>
                <button className="btn btn-secondary">임시 저장</button>
                <button className="btn btn-primary">최종 확인 및 발송</button>
                {/* 또는 "예약 설정하기" */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 