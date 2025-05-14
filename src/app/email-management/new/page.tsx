"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  usage: string;
  marketing: string;
  lastSent: string;
};

// 그룹 타입
interface GroupType {
  id: number;
  name: string;
  members: Member[];
  createdAt: string;
}

// 더미 데이터 확장 (위로 이동)
const dummyMembers: Member[] = [
  {
    id: 1,
    name: "박현환",
    email: "pchan2022@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.17 18:07",
    status: "정상",
    usage: "광고알림(동의)",
    marketing: "SMS(동의)/이메일(동의)",
    lastSent: "2025.03.17 10:07",
  },
  {
    id: 2,
    name: "박현환",
    email: "pchan2022@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.17 18:07",
    status: "정상",
    usage: "광고알림(동의)",
    marketing: "SMS(동의)/이메일(동의)",
    lastSent: "2025.03.17 10:07",
  },
  {
    id: 3,
    name: "박현환",
    email: "pchan2022@hanmail.net",
    phone: "01012345678",
    joinDate: "2025.03.17 18:07",
    status: "정상",
    usage: "광고알림(동의)",
    marketing: "SMS(동의)/이메일(동의)",
    lastSent: "2025.03.17 10:07",
  },
];

export default function NewEmailCampaignPage() {
  const router = useRouter();
  // State for modals and selection
  const [showMemberLayer, setShowMemberLayer] = useState(false);
  const [showGroupLayer, setShowGroupLayer] = useState(false);
  const [showCreateGroupLayer, setShowCreateGroupLayer] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [groups, setGroups] = useState<GroupType[]>([
    { id: 1, name: "VIP 고객", members: [dummyMembers[0]], createdAt: "2024-06-01" },
    { id: 2, name: "뉴스레터 구독자", members: [dummyMembers[1], dummyMembers[2]], createdAt: "2024-06-02" },
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState<Member[]>([]);
  const dummyGroups = [
    { id: 1, name: "VIP 고객", count: 12 },
    { id: 2, name: "뉴스레터 구독자", count: 30 },
  ];
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
    { label: "이메일 인증 대기중", value: "email_pending" },
  ];
  const marketingOptions = [
    { label: "전체", value: "all" },
    { label: "동의", value: "agree" },
    { label: "동의하지 않음", value: "disagree" },
  ];
  const detailSearchOptions = [
    { label: "이름", value: "name" },
    { label: "아이디", value: "id" },
    { label: "이메일", value: "email" },
    { label: "휴대전화", value: "phone" },
  ];
  const [memberStatus, setMemberStatus] = useState("all");
  const [marketing, setMarketing] = useState("all");
  const [joinDateStart, setJoinDateStart] = useState("");
  const [joinDateEnd, setJoinDateEnd] = useState("");
  const [loginDateStart, setLoginDateStart] = useState("");
  const [loginDateEnd, setLoginDateEnd] = useState("");
  const [detailSearchType, setDetailSearchType] = useState("name");

  // 검색 핸들러
  const handleSearch = () => {
    let result = dummyMembers;
    if (selectedStore) {
      // 예시: 상점 id가 1인 경우만 회원이 있다고 가정
      result = result.filter(m => selectedStore === 1);
    }
    if (searchName.trim()) {
      result = result.filter(m => m.name.includes(searchName.trim()));
    }
    setFilteredMembers(result);
  };

  useEffect(() => {
    // 디폴트 전체 검색
    setFilteredMembers(dummyMembers);
  }, [showMemberLayer]);

  // 발송그룹 불러오기
  const handleLoadGroup = () => {
    const group = groups.find(g => g.id === selectedGroupId);
    if (group) {
      setSelectedGroup(group);
      setShowGroupLayer(false);
    }
  };
  // 발송그룹 저장
  const handleSaveGroup = () => {
    if (!newGroupName.trim() || newGroupMembers.length === 0) return;
    const newGroup: GroupType = {
      id: Date.now(),
      name: newGroupName,
      members: newGroupMembers,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setGroups(prev => [...prev, newGroup]);
    setShowCreateGroupLayer(false);
    setShowGroupLayer(true);
    setNewGroupName("");
    setNewGroupMembers([]);
  };

  return (
    <>
      <Head>
        <title>새 이메일 캠페인 만들기</title>
      </Head>
      <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow border p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">새 이메일 캠페인 만들기</h2>
            <button onClick={() => router.back()} className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base"><i className="fa-solid fa-arrow-left"></i>목록으로</button>
          </div>
          {/* 캠페인 정보 */}
          <div className="mb-8 border-b pb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">캠페인 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="campaignName" className="block text-base font-medium text-gray-700 mb-2">캠페인 이름 <span className="text-red-500">*</span></label>
                <input type="text" id="campaignName" placeholder="예: 5월 신제품 출시 안내" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label htmlFor="targetAudience" className="block text-base font-medium text-gray-700 mb-2">발송 대상 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="targetAudience"
                    className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={selectedGroup ? selectedGroup.name : selectedMembers.length > 0 ? selectedMembers.map(m => m.name).join(", ") : ""}
                    placeholder="발송 대상을 선택하세요"
                    readOnly
                  />
                  <button type="button" onClick={() => setShowMemberLayer(true)} className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold hover:bg-[#e2e8f0] border border-[#e5e7eb] text-sm">회원 조회</button>
                  <button type="button" onClick={() => setShowGroupLayer(true)} className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold hover:bg-[#e2e8f0] border border-[#e5e7eb] text-sm">발송 그룹</button>
                </div>
              </div>
            </div>
          </div>
          {/* 이메일 콘텐츠 */}
          <div className="mb-8 border-b pb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">이메일 콘텐츠</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="emailSubject" className="block text-base font-medium text-gray-700 mb-2">이메일 제목 <span className="text-red-500">*</span></label>
                <input type="text" id="emailSubject" placeholder="수신자가 보게 될 이메일 제목" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label htmlFor="senderName" className="block text-base font-medium text-gray-700 mb-2">보내는 사람 이름 <span className="text-red-500">*</span></label>
                <input type="text" id="senderName" placeholder="예: OOO 쇼핑몰" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="senderEmail" className="block text-base font-medium text-gray-700 mb-2">보내는 사람 이메일 주소 <span className="text-red-500">*</span></label>
              <input type="email" id="senderEmail" placeholder="예: contact@yourdomain.com (스티비 인증된 주소)" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label htmlFor="emailBody" className="block text-base font-medium text-gray-700 mb-2">이메일 본문 <span className="text-red-500">*</span></label>
              <div className="w-full h-64 border rounded-lg p-2 bg-gray-50">
                <p className="text-gray-400">리치 텍스트 에디터 영역...</p>
                <textarea className="w-full h-full hidden" id="emailBody"></textarea>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold hover:bg-[#e2e8f0] border border-[#e5e7eb] text-sm"><i className="fa-solid fa-table-cells-large"></i>스티비 템플릿 사용</button>
                <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold hover:bg-[#e2e8f0] border border-[#e5e7eb] text-sm"><i className="fa-solid fa-code"></i>HTML 직접 입력</button>
              </div>
            </div>
          </div>
          {/* 테스트 발송 */}
          <div className="mb-8 border-b pb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">테스트 발송</h3>
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <label htmlFor="testEmailRecipients" className="block text-base font-medium text-gray-700 mb-2">테스트 이메일 수신 주소</label>
                <input type="text" id="testEmailRecipients" placeholder="쉼표(,)로 구분하여 여러 개 입력" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base whitespace-nowrap">테스트 이메일 발송</button>
            </div>
          </div>
          {/* 발송 설정 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">발송 설정</h3>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="flex items-center gap-2">
                <input type="radio" id="sendNow" name="sendOption" value="now" className="accent-blue-500" defaultChecked />
                <label htmlFor="sendNow" className="text-base font-medium text-gray-700">즉시 발송</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="sendLater" name="sendOption" value="later" className="accent-blue-500" />
                <label htmlFor="sendLater" className="text-base font-medium text-gray-700">예약 발송</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="scheduleDate" className="block text-base font-medium text-gray-700 mb-2">발송 날짜</label>
                <input type="date" id="scheduleDate" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label htmlFor="scheduleTime" className="block text-base font-medium text-gray-700 mb-2">발송 시간</label>
                <input type="time" id="scheduleTime" className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button onClick={() => router.back()} className="px-6 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base"><i className="fa-solid fa-list"></i>목록으로 돌아가기</button>
            <button className="px-6 py-2 rounded-lg bg-[#f1f5f9] text-slate-600 font-semibold flex items-center gap-2 hover:bg-[#e2e8f0] border border-[#e5e7eb] text-base"><i className="fa-solid fa-save"></i>임시 저장</button>
            <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold flex items-center gap-2 hover:bg-blue-600 text-base"><i className="fa-solid fa-check"></i>최종 확인 및 발송</button>
          </div>
        </div>
      </div>

      {/* 회원 조회 레이어 팝업 */}
      {showMemberLayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg w-[1200px] max-w-full p-8 flex flex-col min-h-[700px]">
            {/* 상단: 타이틀/검색/필터 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setShowMemberLayer(false)} className="text-base font-semibold px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100">뒤로가기</button>
                <h2 className="text-2xl font-bold">회원 조회</h2>
              </div>
              {/* 이미지 스타일의 검색조건 UI */}
              <div className="bg-[#f8f9fa] rounded-lg p-6 flex flex-col gap-4 border mb-2">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-semibold text-gray-700">상점선택</div>
                  <div className="col-span-10 flex gap-2">
                    <select
                      className="border rounded px-3 py-2 bg-gray-100 w-72"
                      value={selectedStore ?? ''}
                      onChange={e => setSelectedStore(e.target.value ? Number(e.target.value) : null)}
                    >
                      <option value="">조회할 상점을 선택하여 주세요</option>
                      {dummyStores.map(store => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                      ))}
                    </select>
                    <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded font-semibold cursor-not-allowed" disabled>검색</button>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-semibold text-gray-700">회원상태</div>
                  <div className="col-span-10 flex gap-4">
                    {memberStatusOptions.map(opt => (
                      <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="memberStatus" value={opt.value} checked={memberStatus === opt.value} onChange={() => setMemberStatus(opt.value)} className="accent-black" />
                        <span className={memberStatus === opt.value ? "font-bold" : ""}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-semibold text-gray-700">마케팅 동의</div>
                  <div className="col-span-10 flex gap-4">
                    {marketingOptions.map(opt => (
                      <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="marketing" value={opt.value} checked={marketing === opt.value} onChange={() => setMarketing(opt.value)} className="accent-black" />
                        <span className={marketing === opt.value ? "font-bold" : ""}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* 가입기간 */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-semibold text-gray-700">검색기간 (가입기간)</div>
                  <div className="col-span-10 flex gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateStart} onChange={e => setJoinDateStart(e.target.value)} />
                      <span className="mx-1">~</span>
                      <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateEnd} onChange={e => setJoinDateEnd(e.target.value)} />
                    </div>
                    <div className="flex gap-2 ml-4">
                      {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                        <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 접속기간 */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-semibold text-gray-700">검색기간 (접속기간)</div>
                  <div className="col-span-10 flex gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <input type="date" className="border rounded px-3 py-2 w-44" value={loginDateStart} onChange={e => setLoginDateStart(e.target.value)} />
                      <span className="mx-1">~</span>
                      <input type="date" className="border rounded px-3 py-2 w-44" value={loginDateEnd} onChange={e => setLoginDateEnd(e.target.value)} />
                    </div>
                    <div className="flex gap-2 ml-4">
                      {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                        <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 세부검색 */}
                <div className="grid grid-cols-12 gap-4 items-center">
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
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                    />
                    <button className="bg-cyan-600 text-white px-6 py-2 rounded font-semibold" onClick={handleSearch}>검색</button>
                  </div>
                </div>
              </div>
            </div>
            {/* 회원 리스트 테이블 */}
            <div className="flex-1 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                        onChange={e => setSelectedMembers(e.target.checked ? filteredMembers : [])}
                      />
                    </th>
                    <th className="p-2">이름</th>
                    <th className="p-2">아이디</th>
                    <th className="p-2">휴대전화</th>
                    <th className="p-2">가입일시</th>
                    <th className="p-2">상태</th>
                    <th className="p-2">이용상태(여부)</th>
                    <th className="p-2">마케팅동의</th>
                    <th className="p-2">최종발송일</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="border-t text-center">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedMembers.some(m => m.id === member.id)}
                          onChange={e => {
                            if (e.target.checked) setSelectedMembers([...selectedMembers, member]);
                            else setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
                            setSelectedGroup(null);
                          }}
                        />
                      </td>
                      <td className="p-2">{member.name}</td>
                      <td className="p-2">{member.email}</td>
                      <td className="p-2">{member.phone}</td>
                      <td className="p-2">{member.joinDate}</td>
                      <td className="p-2">{member.status}</td>
                      <td className="p-2">{member.usage}</td>
                      <td className="p-2">{member.marketing}</td>
                      <td className="p-2">{member.lastSent}</td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-gray-400 text-center">검색 결과가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* 하단: 페이지네이션/선택/닫기 */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-1">
                <button className="px-2 py-1 border rounded">{"<"}</button>
                <button className="px-2 py-1 border rounded font-bold text-blue-600 bg-blue-50">11</button>
                <button className="px-2 py-1 border rounded">12</button>
                <button className="px-2 py-1 border rounded">13</button>
                <button className="px-2 py-1 border rounded">{">"}</button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowMemberLayer(false)} className="px-4 py-2 rounded bg-gray-200">닫기</button>
                <button onClick={() => setShowMemberLayer(false)} className="px-4 py-2 rounded bg-blue-500 text-white">선택</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 발송 그룹 팝업 */}
      {showGroupLayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg w-[500px] max-w-full p-8 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">발송그룹 관리</h3>
              <button onClick={() => setShowGroupLayer(false)}><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            <button className="mb-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold" onClick={() => { setShowCreateGroupLayer(true); setShowGroupLayer(false); }}>발송그룹 만들기</button>
            <div className="mb-4 max-h-60 overflow-y-auto">
              {groups.length === 0 && <div className="text-gray-400">등록된 그룹이 없습니다.</div>}
              {groups.map(group => (
                <label key={group.id} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input
                    type="radio"
                    name="group"
                    checked={selectedGroupId === group.id}
                    onChange={() => setSelectedGroupId(group.id)}
                  />
                  <span className="font-semibold">{group.name}</span>
                  <span className="text-xs text-gray-400">({group.members.length}명)</span>
                  <span className="text-xs text-gray-400 ml-auto">{group.createdAt}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowGroupLayer(false)} className="px-4 py-2 rounded bg-gray-200">닫기</button>
              <button onClick={handleLoadGroup} className="px-4 py-2 rounded bg-blue-500 text-white font-semibold" disabled={selectedGroupId === null}>불러오기</button>
            </div>
          </div>
        </div>
      )}
      {/* 발송 그룹 만들기(회원조회) 팝업 */}
      {showCreateGroupLayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg w-[1100px] max-w-full p-8 flex flex-col min-h-[700px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">발송그룹 만들기</h3>
              <button onClick={() => { setShowCreateGroupLayer(false); setShowGroupLayer(true); }}><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            {/* 그룹명 입력 */}
            <div className="mb-4 flex gap-2 items-center">
              <span className="font-semibold text-gray-700">발송 그룹명</span>
              <input
                className="border rounded px-3 py-2 flex-1 max-w-xs"
                placeholder="발송그룹명을 입력해 주세요"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
              />
            </div>
            {/* 회원 검색조건 UI (이미지 스타일) */}
            <div className="bg-[#f8f9fa] rounded-lg p-6 flex flex-col gap-4 border mb-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-semibold text-gray-700">상점선택</div>
                <div className="col-span-10 flex gap-2">
                  <select
                    className="border rounded px-3 py-2 bg-gray-100 w-72"
                    value={selectedStore ?? ''}
                    onChange={e => setSelectedStore(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">조회할 상점을 선택하여 주세요</option>
                    {dummyStores.map(store => (
                      <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                  </select>
                  <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded font-semibold cursor-not-allowed" disabled>검색</button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-semibold text-gray-700">회원상태</div>
                <div className="col-span-10 flex gap-4">
                  {memberStatusOptions.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="memberStatus2" value={opt.value} checked={memberStatus === opt.value} onChange={() => setMemberStatus(opt.value)} className="accent-black" />
                      <span className={memberStatus === opt.value ? "font-bold" : ""}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-semibold text-gray-700">마케팅 동의</div>
                <div className="col-span-10 flex gap-4">
                  {marketingOptions.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="marketing2" value={opt.value} checked={marketing === opt.value} onChange={() => setMarketing(opt.value)} className="accent-black" />
                      <span className={marketing === opt.value ? "font-bold" : ""}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* 가입기간 */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-semibold text-gray-700">검색기간 (가입기간)</div>
                <div className="col-span-10 flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateStart} onChange={e => setJoinDateStart(e.target.value)} />
                    <span className="mx-1">~</span>
                    <input type="date" className="border rounded px-3 py-2 w-44" value={joinDateEnd} onChange={e => setJoinDateEnd(e.target.value)} />
                  </div>
                  <div className="flex gap-2 ml-4">
                    {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                      <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                    ))}
                  </div>
                </div>
              </div>
              {/* 접속기간 */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-semibold text-gray-700">검색기간 (접속기간)</div>
                <div className="col-span-10 flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <input type="date" className="border rounded px-3 py-2 w-44" value={loginDateStart} onChange={e => setLoginDateStart(e.target.value)} />
                    <span className="mx-1">~</span>
                    <input type="date" className="border rounded px-3 py-2 w-44" value={loginDateEnd} onChange={e => setLoginDateEnd(e.target.value)} />
                  </div>
                  <div className="flex gap-2 ml-4">
                    {['오늘','일주일','1개월','3개월','6개월','전체'].map(label => (
                      <button key={label} className="border border-cyan-400 text-cyan-600 rounded px-3 py-1 bg-white hover:bg-cyan-50 text-sm">{label}</button>
                    ))}
                  </div>
                </div>
              </div>
              {/* 세부검색 */}
              <div className="grid grid-cols-12 gap-4 items-center">
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
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                  />
                  <button className="bg-cyan-600 text-white px-6 py-2 rounded font-semibold" onClick={handleSearch}>검색</button>
                </div>
              </div>
            </div>
            {/* 회원 리스트 테이블 */}
            <div className="flex-1 overflow-y-auto border rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-2"><input type="checkbox" checked={newGroupMembers.length === filteredMembers.length && filteredMembers.length > 0} onChange={e => setNewGroupMembers(e.target.checked ? filteredMembers : [])} /></th>
                    <th className="p-2">이름</th>
                    <th className="p-2">아이디</th>
                    <th className="p-2">휴대전화</th>
                    <th className="p-2">가입일시</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="border-t text-center">
                      <td className="p-2"><input type="checkbox" checked={newGroupMembers.some(m => m.id === member.id)} onChange={e => {
                        if (e.target.checked) setNewGroupMembers([...newGroupMembers, member]);
                        else setNewGroupMembers(newGroupMembers.filter(m => m.id !== member.id));
                      }} /></td>
                      <td className="p-2">{member.name}</td>
                      <td className="p-2">{member.email}</td>
                      <td className="p-2">{member.phone}</td>
                      <td className="p-2">{member.joinDate}</td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-gray-400 text-center">검색 결과가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2">
              <span className="text-sm text-gray-500 flex items-center">{newGroupMembers.length}명 선택됨</span>
              <button onClick={() => { setShowCreateGroupLayer(false); setShowGroupLayer(true); }} className="px-4 py-2 rounded bg-gray-200">취소</button>
              <button onClick={handleSaveGroup} className="px-4 py-2 rounded bg-blue-500 text-white font-semibold" disabled={!newGroupName.trim() || newGroupMembers.length === 0}>저장</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 