import {Link} from 'react-router-dom';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

export default function WelcomePage() {
    return (
        <>
            <header id="welcome-header">
                <div id="welcome-header-content">
                    <h1>챌린지를 시작하시겠습니까?</h1>
                    <Link id="cta-link" to="/challenges">
                        시작하기
                    </Link>
                </div>
                <img
                    src={cityImg}
                    alt="A city skyline touched by sunlight"
                    id="city-image"
                />
                <img src={heroImg} alt="A superhero wearing a cape" id="hero-image"/>
            </header>
            <main id="welcome-content">
                <section>
                    <h2>지금이 최고의 기회입니다.</h2>
                    <p>
                        우리 플랫폼으로 여러분만의 속도로 도전을 설정하고, 추적하며, 극복하세요.
                        개인적인 성장, 전문적인 성취, 또는 단순한 재미를 위한 것이든 모두 지원해드립니다.
                    </p>
                </section>

                <section>
                    <h2>왜 도전해야 할까요?</h2>
                    <p>
                        도전은 성장을 위한 틀을 제공합니다. 한계를 시험하고 진정한 진전을 이끌어냅니다.
                        우리는 모두가 잠재력을 가지고 있으며, 그것이 발휘되기만을 기다리고 있다고 믿습니다.
                    </p>
                </section>

                <section>
                    <h2>주요 기능</h2>
                    <ul>
                        <li>맞춤형 도전 생성: 여러분만의 규칙과 속도를 설정하세요.</li>
                        <li>
                            진행 상황 추적: 분석 도구로 시간이 지남에 따른 성장을 확인하세요.
                        </li>
                        <li>
                            커뮤니티 지원: 커뮤니티에 가입하고 동료들에게 동기를 얻으세요.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>수천 명의 도전자들과 함께하세요</h2>
                    <p>
                        &quot;여기서 첫 도전을 시작하기 전까지 제가 무엇을 할 수 있는지 전혀 몰랐어요.
                        정말 변화를 가져다준 경험이었습니다!&quot; - 알렉스 P.
                    </p>
                    {/* 여러분의 소감을 추가하거나 캐러셀로 여러 소감을 표시할 수 있습니다 */}
                </section>
            </main>
        </>
    );
}
