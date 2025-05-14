"use client";
import { useState } from "react";

const dummyStores = [
  { id: 1, name: "CONIA 본점" },
  { id: 2, name: "강남점" },
  { id: 3, name: "부산점" },
];
const memberStatusOptions = [
  { label: "전체", value: "all" },
  { label: "정상", value: "active" },
  { label: "이용정지", value: "suspended" },
  { label: "탈퇴", value: "withdrawn" },
  { label: "승인대기중", value: "pending" },
  { label: "이메일인증 대기중", value: "email_pending" },
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
    name: "고현우",
    email: "silok@naver.com",
    phone: "01043891793",
    joinDate: "2025.05.14 14:50",
    status: "이메일인증 대기중",
    recommender: "-",
    usage: "없음",
    marketing: "SMS(미동의) / EMAIL(미동의)",
  },
  {
    id: 2,
    name: "이연준",
    email: "younjun@voyagergames.gg",
    phone: "01052084271",
    joinDate: "2025.05.14 14:40",
    status: "정상",
    recommender: "-",
    usage: "보이저 (승인)",
    marketing: "SMS(미동의) / EMAIL(미동의)",
  },
  {
    id: 3,
    name: "박진수",
    email: "wlstn950105@naver.com",
    phone: "01031597532",
    joinDate: "2025.05.14 13:40",
    status: "정상",
    recommender: "hojin1055@naver.com",
    usage: "BGF리테일 (승인)",
    marketing: "SMS(미동의) / EMAIL(미동의)",
  },
];

export default function CustomerMemberSearchPage() {
  const [selectedStore, setSelectedStore] = useState("");
  const [status, setStatus] = useState<string[]>(["all"]);
  const [joinDateStart, setJoinDateStart] = useState("");
  const [joinDateEnd, setJoinDateEnd] = useState("");
  const [detailSearchType, setDetailSearchType] = useState("name");
  const [detailSearchValue, setDetailSearchValue] = useState("");

  // 상태 체크박스 핸들러
  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setStatus(["all"]);
    } else {
      setStatus(prev => {
        const next = prev.includes(value)
          ? prev.filter(v => v !== value && v !== "all")
          : [...prev.filter(v => v !== "all"), value];
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">고객 회원 관리 - 상점 이용자</h2>
          <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base">
            <i className="fa-solid fa-arrow-left"></i>뒤로가기
          </button>
        </div>
        {/* 필터/검색 영역 */}
        <div className="bg-white rounded-xl shadow border p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">상점선택</label>
              <select
                className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedStore}
                onChange={e => setSelectedStore(e.target.value)}
              >
                <option value="">조회할 상점을 선택하세요.</option>
                {dummyStores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">회원상태</label>
              <div className="flex flex-wrap gap-4">
                {memberStatusOptions.map(opt => (
                  <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status.includes(opt.value)}
                      onChange={() => handleStatusChange(opt.value)}
                      className="accent-blue-500"
                    />
                    <span className={status.includes(opt.value) ? "font-bold" : ""}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">검색기간 (가입기간)</label>
              <div className="flex gap-2 items-center">
                <input type="date" className="rounded-lg border border-[#cbd5e1] px-4 py-3 w-44" value={joinDateStart} onChange={e => setJoinDateStart(e.target.value)} />
                <span className="mx-1">-</span>
                <input type="date" className="rounded-lg border border-[#cbd5e1] px-4 py-3 w-44" value={joinDateEnd} onChange={e => setJoinDateEnd(e.target.value)} />
                <div className="flex gap-2 ml-4">
                  {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                    <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">세부검색</label>
              <div className="flex gap-2 items-center">
                <select className="rounded-lg border border-[#cbd5e1] px-4 py-3 bg-white" value={detailSearchType} onChange={e => setDetailSearchType(e.target.value)}>
                  {detailSearchOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  className="rounded-lg border border-[#cbd5e1] px-4 py-3 flex-1"
                  placeholder={`검색할 회원의 ${detailSearchOptions.find(opt => opt.value === detailSearchType)?.label}을(를) 입력해 주세요.`}
                  value={detailSearchValue}
                  onChange={e => setDetailSearchValue(e.target.value)}
                />
                <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold border border-[#e5e7eb]">초기화</button>
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold">검색</button>
              </div>
            </div>
          </div>
        </div>
        {/* 리스트 영역 */}
        <div className="bg-white rounded-xl shadow border p-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-500">총 : 11895개</div>
            <div className="flex gap-2 items-center">
              <button className="border px-3 py-1 rounded text-sm text-cyan-700 border-cyan-400">조회내역 엑셀다운로드</button>
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
                <th className="p-2">이름</th>
                <th className="p-2">아이디</th>
                <th className="p-2">휴대전화</th>
                <th className="p-2">가입일시</th>
                <th className="p-2">상태</th>
                <th className="p-2">추천인</th>
                <th className="p-2">이용상태(승인여부)</th>
                <th className="p-2">마케팅 동의여부</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {dummyMembers.map(member => (
                <tr key={member.id} className="border-t text-center">
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.phone}</td>
                  <td className="p-2">{member.joinDate}</td>
                  <td className="p-2">{member.status}</td>
                  <td className="p-2">{member.recommender}</td>
                  <td className="p-2">{member.usage}</td>
                  <td className="p-2">{member.marketing}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button className="px-3 py-1 rounded-lg bg-blue-500 text-white font-semibold">이메일 발송</button>
                    <button className="px-3 py-1 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold border border-[#e5e7eb]">상세보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 