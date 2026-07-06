import { createClient } from "@supabase/supabase-js";

// docs/supabase-info.md 에 기재된 프로젝트 정보를 그대로 하드코딩합니다.
// (Publishable/anon key는 클라이언트에 노출되는 것을 전제로 설계된 공개 키이므로
//  소스코드에 직접 포함해도 안전합니다.)
const SUPABASE_PROJECT_ID = "mazpvszyxxyppmyyuwcv";
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2vjnw6wHIu4NE9SUJH5r2A_XJbHxylP";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const RESULTS_TABLE = "mbti_results";
