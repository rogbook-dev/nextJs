"use client";
import { useState } from "react";

const dummyStores = [
  { id: 1, name: "넷마블" },
  { id: 2, name: "페이히어" },
  { id: 3, name: "kcp" },
];
const memberStatusOptions = [
  { label: "전체", value: "all" },
  { label: "정상", value: "active" },
  { label: "이용정지", value: "suspended" },
  { label: "탈퇴", value: "withdrawn" },
  { label: "승인대기중", value: "pending" },
  { label: "이메일 인증 대기중", value: "email_pending" },
];
const detailSearchOptions = [
  { label: "이름", value: "name" },
  { label: "아이디", value: "id" },
  { label: "이메일", value: "email" },
  { label: "휴대전화", value: "phone" },
];
const dummyMembers = [
  {
    id: 1,
    name: "박현환",
    email: "pchan0228@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.27 10:07",
    status: "정상",
    recommender: "-",
    usage: "공무원연금공단(승인)",
    marketing: "SMS(동의)/이메일(동의)",
  },
  {
    id: 2,
    name: "박현환",
    email: "pchan0228@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.27 10:07",
    status: "정상",
    recommender: "-",
    usage: "공무원연금공단(승인)",
    marketing: "SMS(동의)/이메일(동의)",
  },
  {
    id: 3,
    name: "박현환",
    email: "pchan0228@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.27 10:07",
    status: "정상",
    recommender: "-",
    usage: "공무원연금공단(승인)",
    marketing: "SMS(동의)/이메일(동의)",
  },
];

export default function CustomerMemberSearchPage() {
  const [selectedStore, setSelectedStore] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [joinDateStart, setJoinDateStart] = useState("");
  const [joinDateEnd, setJoinDateEnd] = useState("");
  const [detailSearchType, setDetailSearchType] = useState("name");
  const [detailSearchValue, setDetailSearchValue] = useState("");
  const [showSendMailLayer, setShowSendMailLayer] = useState(false);
  const [selectedMemberForSend, setSelectedMemberForSend] = useState<any>(null);

  const handleSendMailClick = (member: any) => {
    setSelectedMemberForSend(member);
    setShowSendMailLayer(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r flex flex-col items-center py-8 min-h-screen shadow-md">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2">
          <span className="text-xl font-bold text-[#ff5a1f]">weinc</span>
        </div>
        <nav className="w-full flex-1 flex flex-col gap-2 px-2">
          <SidebarSection label="상품/재고" icon="fa-cart-shopping" />
          <SidebarSection label="주문/배송" icon="fa-plane" />
          <SidebarSection label="상점" icon="fa-store" />
          <SidebarSection label="회원" icon="fa-user" />
          <SidebarSection label="정산" icon="fa-file-invoice-dollar" />
          <SidebarSection label="마케팅" icon="fa-bullhorn" />
          <SidebarSection label="권한" icon="fa-key" />
          <SidebarSection label="운영지원" icon="fa-headset" />
          <SidebarSection label="설정" icon="fa-gear" />
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* 상단 바 */}
        <div className="flex items-center justify-between px-8 py-4 border-b">
          <button className="rounded bg-white border px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">뒤로가기</button>
          <h2 className="text-xl font-bold text-gray-800">고객회원관리 상점 이용자</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Home</span>
            <span className="text-xs border px-2 py-1 rounded bg-gray-100 text-gray-600">고객회원관리</span>
          </div>
        </div>
        {/* 검색/필터 영역 */}
        <div className="px-8 py-6 border-b bg-white">
          <div className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-2 font-semibold text-gray-700">상점선택</div>
            <div className="col-span-10 flex gap-2">
              <select
                className="border rounded px-3 py-2 bg-gray-100 w-72"
                value={selectedStore}
                onChange={e => setSelectedStore(e.target.value)}
              >
                <option value="">조회할 상점을 선택하여 주세요</option>
                {dummyStores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
              <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded font-semibold cursor-not-allowed" disabled>검색</button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-2 font-semibold text-gray-700">회원상태</div>
            <div className="col-span-10 flex gap-4">
              {memberStatusOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="memberStatus" value={opt.value} checked={status === opt.value} onChange={() => setStatus(opt.value)} className="accent-black" />
                  <span className={status === opt.value ? "font-bold" : ""}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-2 font-semibold text-gray-700">검색기간 (가입기간)</div>
            <div className="col-span-10 flex gap-2 items-center">
              <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateStart} onChange={e => setJoinDateStart(e.target.value)} />
              <span className="mx-1">~</span>
              <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateEnd} onChange={e => setJoinDateEnd(e.target.value)} />
              <div className="flex gap-2 ml-4">
                {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                  <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-2 font-semibold text-gray-700">세부검색</div>
            <div className="col-span-10 flex gap-2 items-center">
              <select className="border rounded px-3 py-2 bg-white" value={detailSearchType} onChange={e => setDetailSearchType(e.target.value)}>
                {detailSearchOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder={`검색할 회원의 ${detailSearchOptions.find(opt => opt.value === detailSearchType)?.label}을(를) 입력해 주세요`}
                value={detailSearchValue}
                onChange={e => setDetailSearchValue(e.target.value)}
              />
              <button className="bg-white border border-gray-300 text-gray-600 px-6 py-2 rounded font-semibold">초기화</button>
              <button className="bg-cyan-600 text-white px-6 py-2 rounded font-semibold">검색</button>
            </div>
          </div>
        </div>
        {/* 리스트 영역 */}
        <div className="px-8 py-6 flex-1 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-500">총 1187개</div>
            <div className="flex gap-2 items-center">
              <button className="border px-3 py-1 rounded text-sm text-cyan-700 border-cyan-400">조회내역 엑셀다운로드</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">선택항목 엑셀발송</button>
              <select className="border rounded px-2 py-1 text-sm">
                <option>10개씩 보기</option>
                <option>20개씩 보기</option>
                <option>50개씩 보기</option>
              </select>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-gray-700">
                <th className="p-2"><input type="checkbox" /></th>
                <th className="p-2">이름</th>
                <th className="p-2">아이디</th>
                <th className="p-2">휴대전화</th>
                <th className="p-2">가입일시</th>
                <th className="p-2">상태</th>
                <th className="p-2">추천인</th>
                <th className="p-2">이용상점(여부)</th>
                <th className="p-2">마케팅동의</th>
                <th className="p-2">최종접속일</th>
                <th className="p-2">메일발송</th>
                <th className="p-2">상세보기</th>
              </tr>
            </thead>
            <tbody>
              {dummyMembers.map(member => (
                <tr key={member.id} className="border-t text-center">
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.phone}</td>
                  <td className="p-2">{member.joinDate}</td>
                  <td className="p-2">{member.status}</td>
                  <td className="p-2">{member.recommender}</td>
                  <td className="p-2">{member.usage}</td>
                  <td className="p-2">{member.marketing}</td>
                  <td className="p-2">2025.03.27 10:07</td>
                  <td className="p-2">
                    <button className="bg-white border border-gray-300 px-3 py-1 rounded" onClick={() => handleSendMailClick(member)}>발송</button>
                  </td>
                  <td className="p-2"><button className="bg-white border border-gray-300 px-3 py-1 rounded">상세보기</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded">{"<"}</button>
              <button className="px-2 py-1 border rounded">11</button>
              <button className="px-2 py-1 border rounded font-bold text-blue-600 bg-blue-50">12</button>
              <button className="px-2 py-1 border rounded">13</button>
              <button className="px-2 py-1 border rounded">{">"}</button>
            </div>
            <div className="text-2xl font-bold text-gray-300 tracking-widest">중략</div>
          </div>
        </div>
      </div>
      {/* 메일 발송 팝업 레이어 */}
      {showSendMailLayer && selectedMemberForSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg w-[500px] max-w-full p-8 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">이메일 발송</h3>
              <button onClick={() => setShowSendMailLayer(false)}><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-2">보내는 사람 이름</label>
              <input type="text" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800" value={selectedMemberForSend.name} readOnly />
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-2">보내는 사람 이메일 주소</label>
              <input type="email" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800" value="contact@conia.co.kr" readOnly />
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-2">이메일 제목</label>
              <input type="text" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800" placeholder="수신자가 보게 될 이메일 제목" />
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-2">이메일 본문</label>
              <textarea className="w-full h-32 rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800" placeholder="이메일 내용을 입력하세요"></textarea>
            </div>
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold border border-[#e5e7eb] text-sm">템플릿 사용</button>
              <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold border border-[#e5e7eb] text-sm">HTML 직접 입력</button>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSendMailLayer(false)} className="px-4 py-2 rounded bg-gray-200">닫기</button>
              <button className="px-4 py-2 rounded bg-blue-500 text-white font-semibold">발송</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarSection({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="mb-2">
      <button className="flex items-center w-full px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-100 transition group">
        <span className="mr-3 text-lg"><i className={`fa-solid ${icon}`}></i></span>
        <span className="flex-1 text-left">{label}</span>
      </button>
    </div>
  );
} 