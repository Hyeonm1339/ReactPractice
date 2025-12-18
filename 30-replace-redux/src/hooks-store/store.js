import {useEffect, useState} from "react";

// 전역 상태를 저장하는 객체
let globalState = {};

// 상태 변경을 감지할 컴포넌트들의 상태 설정 함수들을 저장하는 배열
let listeners = [];

// 액션들을 저장하는 객체 (리듀서 함수들을 저장)
let actions = {};

/**
 * 전역 상태 관리를 위한 커스텀 훅
 * @returns {Array} [전역 상태, 디스패치 함수]를 반환
 */
export const useStore = () => {
    // 상태 업데이트를 위한 setState 함수만 사용
    // 주의: 여기서 반환된 setState는 컴포넌트마다 새로 생성되지만,
    // 이를 통해 각 컴포넌트가 전역 상태를 구독할 수 있게 됨
    const setState = useState(globalState)[1];

    /**
     * 액션을 디스패치하는 함수
     * @param {string} actionIdentifier - 실행할 액션의 식별자
     * @param {*} payload - 액션 실행에 필요한 추가 데이터 (선택 사항)
     */
    const dispatch = (actionIdentifier, payload) => {
        // 해당 액션을 실행하고 새로운 상태를 받아옴
        const newState = actions[actionIdentifier](globalState, payload);

        // 전역 상태를 새로운 상태로 업데이트 (병합)
        globalState = {...globalState, ...newState};

        // 구독 중인 모든 컴포넌트의 상태를 업데이트
        for (const listener of listeners) {
            // 각 컴포넌트의 setState 함수를 호출하여 리렌더링 유발
            listener(globalState);
        }
    };

    // 컴포넌트가 마운트될 때 실행
    useEffect(() => {
        // 현재 컴포넌트의 setState 함수를 리스너 배열에 추가
        // 이렇게 하면 이 컴포넌트는 전역 상태가 변경될 때마다 업데이트됨
        listeners.push(setState);

        // 클린업 함수: 컴포넌트가 언마운트될 때 실행
        return () => {
            // 현재 컴포넌트의 setState 함수를 리스너 배열에서 제거
            // 메모리 누수 방지
            listeners = listeners.filter(listener => listener !== setState);
        };
    }, [setState]); // setState는 안정적인 참조이므로 의존성 배열에 추가

    // 전역 상태와 디스패치 함수를 반환
    // 이 훅을 사용하는 컴포넌트는 이 두 값을 통해 상태를 구독하고 업데이트할 수 있음
    return [globalState, dispatch];
};

/**
 * 스토어 초기화 함수
 * @param {Object} userActions - 액션 생성자 객체 (리듀서 함수들)
 * @param {Object} initialState - 초기 상태
 */
export const initStore = (userActions, initialState) => {
    // 초기 상태가 제공되면 전역 상태에 병합
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }
    // 액션들을 병합 (기존 액션들을 덮어쓰지 않도록 스프레드 연산자 사용)
    actions = {...actions, ...userActions};
};